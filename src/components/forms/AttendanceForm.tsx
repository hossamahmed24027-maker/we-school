'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    date: z.string().min(1, { message: "Date is required!" }),
    studentId: z.string().min(1, { message: "Student is required!" }),
    present: z.preprocess((val) => val === "true" || val === true, z.boolean()),
    lessonId: z.coerce.number().min(1, { message: "Lesson is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function AttendanceForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
        students: { id: string; name: string; surname: string }[];
        lessons: { id: number; subjectName: string; className: string }[];
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
            date: data?.date ? new Date(data.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
            studentId: data?.studentId,
            present: data?.present,
            lessonId: data?.lessonId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createAttendance : updateAttendance;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Attendance ${type === "create" ? "marked" : "updated"} successfully! 📅`);
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
                {type === "create" ? "Mark Attendance" : "Edit Attendance Record"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Date" name="date" type="date" register={register} error={errors?.date} />

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Student</label>
                    <select {...register("studentId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.students.map(s => (
                            <option key={s.id} value={s.id}>{s.name} {s.surname}</option>
                        ))}
                    </select>
                    {errors.studentId?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.studentId.message.toString()}</p>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Lesson</label>
                    <select {...register("lessonId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.lessons.map(l => (
                            <option key={l.id} value={l.id}>{l.subjectName} - {l.className}</option>
                        ))}
                    </select>
                    {errors.lessonId?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.lessonId.message.toString()}</p>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Status</label>
                    <select {...register("present")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        <option value="true">Present</option>
                        <option value="false">Absent</option>
                    </select>
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Submit Attendance" : "Update Record"}
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
