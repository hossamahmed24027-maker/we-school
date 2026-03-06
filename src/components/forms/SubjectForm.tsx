'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()).min(1, { message: "At least one teacher is required!" }),
});

type Inputs = {
    id?: number;
    name: string;
    teachers: string[];
};

export default function SubjectForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: { teachers: { id: string; name: string; surname: string }[] };
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
            teachers: data?.teacherIds ? data.teacherIds.split(', ') : [],
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createSubject : updateSubject;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Subject ${type === "create" ? "created" : "updated"} successfully! 📘`);
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
                {type === "create" ? "Create New Subject" : "Update Subject"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Subject Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                        defaultValue={data?.name}
                    />
                    {errors.name?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name.message.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Teachers</label>
                    <select
                        multiple
                        {...register("teachers")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all min-h-[100px]"
                    >
                        {relatedData?.teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} {teacher.surname}
                            </option>
                        ))}
                    </select>
                    {errors.teachers?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.teachers.message.toString()}</p>}
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Confirm Subject" : "Update Subject"}
            </button>
        </form>
    );
}
