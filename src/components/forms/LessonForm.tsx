'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createLesson, updateLesson } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Lesson name is required!" }),
    day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], { message: "Valid day is required!" }),
    startTime: z.string().min(1, { message: "Start time is required!" }),
    endTime: z.string().min(1, { message: "End time is required!" }),
    subjectId: z.coerce.number().min(1, { message: "Subject is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    teacherId: z.string().min(1, { message: "Teacher is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function LessonForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
        subjects: { id: number; name: string }[];
        classes: { id: number; name: string }[];
        teachers: { id: string; name: string; surname: string }[];
    };
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            id: data?.id,
            name: data?.name,
            day: data?.day,
            startTime: data?.startTime ? new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "",
            endTime: data?.endTime ? new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "",
            subjectId: data?.subjectId,
            classId: data?.classId,
            teacherId: data?.teacherId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            // Convert time to full date for Prisma
            const today = new Date().toISOString().split('T')[0];
            const startStr = `${today}T${values.startTime}:00`;
            const endStr = `${today}T${values.endTime}:00`;

            const payload = {
                ...values,
                startTime: new Date(startStr),
                endTime: new Date(endStr),
            };

            const action = type === "create" ? createLesson : updateLesson;
            const res = await (action as any)({ success: false, error: false }, payload);

            if (res.success) {
                toast.success(`Lesson ${type === "create" ? "created" : "updated"} successfully! 📝`);
                setOpen?.(false);
                router.refresh();
            } else {
                toast.error("Something went wrong! ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to process request! ❌");
        }
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-2xl font-black text-blue-900 tracking-tight">
                {type === "create" ? "Create New Lesson" : "Update Lesson"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Lesson Name" name="name" register={register} error={errors?.name} />
                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Day</label>
                    <select className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm" {...register("day")}>
                        <option value="MONDAY">Monday</option>
                        <option value="TUESDAY">Tuesday</option>
                        <option value="WEDNESDAY">Wednesday</option>
                        <option value="THURSDAY">Thursday</option>
                        <option value="FRIDAY">Friday</option>
                    </select>
                    {errors.day?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.day.message.toString()}</p>}
                </div>
                <InputField label="Start Time" name="startTime" type="time" register={register} error={errors?.startTime} />
                <InputField label="End Time" name="endTime" type="time" register={register} error={errors?.endTime} />

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Subject</label>
                    <select {...register("subjectId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Class</label>
                    <select {...register("classId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Teacher</label>
                    <select {...register("teacherId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.teachers.map(t => (
                            <option key={t.id} value={t.id}>{t.name} {t.surname}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Create Lesson" : "Update Lesson"}
            </button>
        </form>
    );
}

const InputField = ({ label, type = "text", register, name, error, inputProps }: {
    label: string;
    type?: string;
    register: UseFormRegister<Inputs>;
    name: keyof Inputs;
    error?: FieldError;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
    return (
        <div className="flex flex-col gap-2 w-full md:w-[30%]">
            <label className="text-xs font-bold text-slate-500">{label}</label>
            <input
                type={type}
                {...register(name)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                {...inputProps}
            />
            {error?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{error.message.toString()}</p>}
        </div>
    )
}
