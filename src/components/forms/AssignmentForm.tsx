'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createAssignment, updateAssignment } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Assignment title is required!" }),
    startDate: z.string().min(1, { message: "Start date is required!" }),
    dueDate: z.string().min(1, { message: "Due date is required!" }),
    lessonId: z.coerce.number().min(1, { message: "Lesson is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function AssignmentForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
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
            title: data?.name,
            startDate: data?.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : "",
            dueDate: data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : "",
            lessonId: data?.lessonId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createAssignment : updateAssignment;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Assignment ${type === "create" ? "published" : "updated"} successfully! 📂`);
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
                {type === "create" ? "Add Assignment" : "Edit Assignment"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Assignment Title" name="title" register={register} error={errors?.title} />
                <InputField label="Start Date" name="startDate" type="datetime-local" register={register} error={errors?.startDate} />
                <InputField label="Due Date" name="dueDate" type="datetime-local" register={register} error={errors?.dueDate} />

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Lesson</label>
                    <select {...register("lessonId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.lessons.map(l => (
                            <option key={l.id} value={l.id}>{l.subjectName} - {l.className}</option>
                        ))}
                    </select>
                    {errors.lessonId?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.lessonId.message.toString()}</p>}
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Post Assignment" : "Update Assignment"}
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
