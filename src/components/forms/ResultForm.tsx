'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as z from "zod";
import { toast } from "react-toastify";
import { createResult, updateResult } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    score: z.coerce.number().min(0, { message: "Score must be at least 0!" }).max(100, { message: "Score cannot exceed 100!" }),
    studentId: z.string().min(1, { message: "Student is required!" }),
    type: z.enum(["exam", "assignment"]),
    examId: z.coerce.number().optional(),
    assignmentId: z.coerce.number().optional(),
});

type Inputs = z.infer<typeof schema>;

export default function ResultForm({
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
        exams: { id: number; title: string }[];
        assignments: { id: number; title: string }[];
    };
}) {
    const [resultType, setResultType] = useState<"exam" | "assignment">(data?.examId ? "exam" : "assignment");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            id: data?.id,
            score: data?.score,
            studentId: data?.studentId,
            type: data?.examId ? "exam" : "assignment",
            examId: data?.examId,
            assignmentId: data?.assignmentId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            // Ensure only one of examId or assignmentId is sent based on type
            const submissionData = { ...values };
            if (values.type === "exam") {
                submissionData.assignmentId = undefined;
            } else {
                submissionData.examId = undefined;
            }

            const action = type === "create" ? createResult : updateResult;
            const res = await (action as any)({ success: false, error: false }, submissionData);

            if (res.success) {
                toast.success(`Result ${type === "create" ? "recorded" : "updated"} successfully! 🏆`);
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
                {type === "create" ? "Enter New Result" : "Edit Grade Result"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Score (0-100)" name="score" type="number" register={register} error={errors?.score} />

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
                    <label className="text-xs font-bold text-slate-500">Result Type</label>
                    <select
                        {...register("type")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                        onChange={(e) => setResultType(e.target.value as "exam" | "assignment")}
                    >
                        <option value="exam">Exam</option>
                        <option value="assignment">Assignment</option>
                    </select>
                </div>

                {resultType === "exam" ? (
                    <div className="flex flex-col gap-2 w-full md:w-[30%]">
                        <label className="text-xs font-bold text-slate-500">Exam</label>
                        <select {...register("examId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                            {relatedData?.exams.map(e => (
                                <option key={e.id} value={e.id}>{e.title}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 w-full md:w-[30%]">
                        <label className="text-xs font-bold text-slate-500">Assignment</label>
                        <select {...register("assignmentId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                            {relatedData?.assignments.map(a => (
                                <option key={a.id} value={a.id}>{a.title}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Record Performance" : "Save Update"}
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
