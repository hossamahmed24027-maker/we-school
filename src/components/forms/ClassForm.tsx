'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createClass, updateClass } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Class name is required!" }),
    capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    supervisorId: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

export default function ClassForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
        teachers: { id: string; name: string; surname: string }[];
        grades: { id: number; level: number }[];
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
            capacity: data?.capacity,
            gradeId: data?.gradeId,
            supervisorId: data?.supervisorId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createClass : updateClass;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Class ${type === "create" ? "created" : "updated"} successfully! 🏫`);
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
                {type === "create" ? "Create New Class" : "Update Class Info"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Class Name (e.g., 1A)</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                    />
                    {errors.name?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name.message.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Capacity</label>
                    <input
                        type="number"
                        {...register("capacity")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                    />
                    {errors.capacity?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.capacity.message.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Grade</label>
                    <select
                        {...register("gradeId")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                    >
                        {relatedData?.grades.map((grade) => (
                            <option key={grade.id} value={grade.id}>
                                Grade {grade.level}
                            </option>
                        ))}
                    </select>
                    {errors.gradeId?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.gradeId.message.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[48%]">
                    <label className="text-xs font-bold text-slate-500">Supervisor</label>
                    <select
                        {...register("supervisorId")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all"
                    >
                        <option value="">Select Supervisor</option>
                        {relatedData?.teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} {teacher.surname}
                            </option>
                        ))}
                    </select>
                    {errors.supervisorId?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.supervisorId.message.toString()}</p>}
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Add Class" : "Save Changes"}
            </button>
        </form>
    );
}
