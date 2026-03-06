'use client'

import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createStudent, updateStudent } from "@/lib/actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    id: z.string().optional(),
    username: z.string().min(3, { message: "Username must be at least 3 characters long!" }),
    email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal('')),
    password: z.string().min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal('')),
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    phone: z.string().min(1, { message: "Phone is required!" }).optional().or(z.literal('')),
    address: z.string().min(1, { message: "Address is required!" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.string().min(1, { message: "Birthday is required!" }),
    sex: z.enum(["male", "female"], { message: "Sex is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    parentId: z.string().min(1, { message: "Parent is required!" }),
    img: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

export default function StudentForm({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: (open: boolean) => void;
    relatedData?: {
        parents: { id: string; name: string; surname: string }[];
        classes: { id: number; name: string }[];
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
            username: data?.username,
            email: data?.email,
            firstName: data?.name,
            lastName: data?.surname,
            phone: data?.phone,
            address: data?.address,
            bloodType: data?.bloodType || "A+",
            birthday: data?.birthday ? new Date(data.birthday).toISOString().split('T')[0] : "",
            sex: data?.sex?.toLowerCase() || "male",
            gradeId: data?.gradeId,
            classId: data?.classId,
            parentId: data?.parentId,
        }
    });

    const router = useRouter();

    const onSubmit = handleSubmit(async (values) => {
        try {
            const action = type === "create" ? createStudent : updateStudent;
            const res = await (action as any)({ success: false, error: false }, values);

            if (res.success) {
                toast.success(`Student ${type === "create" ? "registered" : "updated"} successfully! 🎒`);
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
                {type === "create" ? "Student Registration" : "Edit Student File"}
            </h1>
            {data && <input type="hidden" {...register("id")} />}
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Portal Access</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Username" name="username" register={register} error={errors?.username} />
                <InputField label="Email" name="email" type="email" register={register} error={errors?.email} />
                <InputField label="Password" name="password" type="password" register={register} error={errors?.password} />
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enrollment Details</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="First Name" name="firstName" register={register} error={errors?.firstName} />
                <InputField label="Last Name" name="lastName" register={register} error={errors?.lastName} />
                <InputField label="Phone" name="phone" register={register} error={errors?.phone} />
                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Grade</label>
                    <select {...register("gradeId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.grades.map(grade => (
                            <option key={grade.id} value={grade.id}>Grade {grade.level}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Class</label>
                    <select {...register("classId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Parent</label>
                    <select {...register("parentId")} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm">
                        {relatedData?.parents.map(parent => (
                            <option key={parent.id} value={parent.id}>{parent.name} {parent.surname}</option>
                        ))}
                    </select>
                </div>
                <InputField label="Address" name="address" register={register} error={errors?.address} />
                <InputField label="Blood Type" name="bloodType" register={register} error={errors?.bloodType} />
                <InputField label="Birthday" name="birthday" type="date" register={register} error={errors?.birthday} />

                <div className="flex flex-col gap-2 w-full md:w-[30%]">
                    <label className="text-xs font-bold text-slate-500">Sex</label>
                    <select className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm" {...register("sex")}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all mt-4">
                {type === "create" ? "Complete Registration" : "Update Records"}
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
