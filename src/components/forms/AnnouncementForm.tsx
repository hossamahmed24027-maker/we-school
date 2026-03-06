'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Announcement title is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    classId: z.coerce.number().optional().nullable(),
});

type Inputs = z.infer<typeof schema>;

export default function AnnouncementForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
        classes: { id: number; name: string }[];
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
            title: data?.title,
            date: data?.date ? new Date(data.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
            description: data?.description,
            classId: data?.classId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createAnnouncement : updateAnnouncement;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Announcement ${type === "create" ? "posted" : "updated"} successfully! 📢`);
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
                {type === "create" ? "Post New Announcement" : "Modify Announcement"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Title" name="title" register={register} error={errors?.title} />
                <InputField label="Date" name="date" type="date" register={register} error={errors?.date} />

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Target Class (Optional)</label>
                    <select {...register("classId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        <option value="">All Classes</option>
                        {relatedData?.classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-bold text-slate-500">Announcement Description</label>
                    <textarea
                        {...register("description")}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm transition-all min-h-[100px]"
                        placeholder="Broadcast your message..."
                    />
                    {errors.description?.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.description.message.toString()}</p>}
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Publish Announcement" : "Broadcast Changes"}
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
