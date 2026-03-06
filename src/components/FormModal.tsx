'use client'

import { Plus, X, Trash2, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import {
    deleteAnnouncement,
    deleteAssignment,
    deleteAttendance,
    deleteClass,
    deleteEvent,
    deleteExam,
    deleteLesson,
    deleteParent,
    deleteResult,
    deleteStudent,
    deleteSubject,
    deleteTeacher,
} from '@/lib/actions'

const deleteActionMap = {
    teacher: deleteTeacher,
    student: deleteStudent,
    parent: deleteParent,
    subject: deleteSubject,
    class: deleteClass,
    lesson: deleteLesson,
    exam: deleteExam,
    assignment: deleteAssignment,
    result: deleteResult,
    attendance: deleteAttendance,
    event: deleteEvent,
    announcement: deleteAnnouncement,
};

// Use absolute paths to resolve lint errors
const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const StudentForm = dynamic(() => import("@/components/forms/StudentForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const ParentForm = dynamic(() => import("@/components/forms/ParentForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const SubjectForm = dynamic(() => import("@/components/forms/SubjectForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const ClassForm = dynamic(() => import("@/components/forms/ClassForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const LessonForm = dynamic(() => import("@/components/forms/LessonForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const ExamForm = dynamic(() => import("@/components/forms/ExamForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const AssignmentForm = dynamic(() => import("@/components/forms/AssignmentForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const ResultForm = dynamic(() => import("@/components/forms/ResultForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const AttendanceForm = dynamic(() => import("@/components/forms/AttendanceForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const EventForm = dynamic(() => import("@/components/forms/EventForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});
const AnnouncementForm = dynamic(() => import("@/components/forms/AnnouncementForm"), {
    loading: () => <div className="p-4 text-center animate-pulse">Loading Form...</div>,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const forms: {
    [key: string]: (type: "create" | "update", data: any, setOpen: (open: boolean) => void, relatedData?: any) => React.ReactNode;
} = {
    teacher: (type, data, setOpen, relatedData) => <TeacherForm type={type} data={data} />,
    student: (type, data, setOpen, relatedData) => <StudentForm type={type} data={data} />,
    parent: (type, data, setOpen, relatedData) => <ParentForm type={type} data={data} />,
    subject: (type, data, setOpen, relatedData) => <SubjectForm type={type} data={data} relatedData={relatedData} />,
    class: (type, data, setOpen, relatedData) => <ClassForm type={type} data={data} />,
    lesson: (type, data, setOpen, relatedData) => <LessonForm type={type} data={data} />,
    exam: (type, data, setOpen, relatedData) => <ExamForm type={type} data={data} />,
    assignment: (type, data, setOpen, relatedData) => <AssignmentForm type={type} data={data} />,
    result: (type, data, setOpen, relatedData) => <ResultForm type={type} data={data} />,
    attendance: (type, data, setOpen, relatedData) => <AttendanceForm type={type} data={data} />,
    event: (type, data, setOpen, relatedData) => <EventForm type={type} data={data} />,
    announcement: (type, data, setOpen, relatedData) => <AnnouncementForm type={type} data={data} />,
};

import { APP_ROLE } from '@/lib/constants';

export default function FormModal({
    table,
    type,
    data,
    id,
    relatedData,
}: {
    table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement'
    type: 'create' | 'update' | 'delete'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
    id?: number | string
    relatedData?: any
}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [state, formAction] = useFormState(deleteActionMap[table], {
        success: false,
        error: false,
    });

    useEffect(() => {
        if (state.success) {
            toast.success(`${table} deleted successfully! 🎉`);
            setOpen(false);
            router.refresh();
        }
        if (state.error) {
            toast.error(`Error deleting ${table}! ❌`);
        }
    }, [state, table, router]);

    if (APP_ROLE !== 'admin') return null;

    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
    const bgColor =
        type === 'create'
            ? 'bg-lamaYellow'
            : type === 'update'
                ? 'bg-lamaSky'
                : 'bg-lamaPurple'

    const handleAction = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(`${table} ${type}d successfully! 🎉`);
        setOpen(false);
    }

    const renderForm = () => {
        return type === 'delete' && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="hidden" name="id" value={id} />
                <span className="text-center font-bold text-lg text-slate-700">
                    ⚠️ Warning!
                </span>
                <p className="text-center text-slate-500">
                    Are you sure you want to delete this {table}? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                    <button type="button" onClick={() => setOpen(false)} className="px-6 py-2 bg-slate-100 rounded-xl font-bold text-slate-500 hover:bg-slate-200">Cancel</button>
                    <button className="bg-red-500 text-white py-2 px-6 rounded-xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all">
                        confirm Delete
                    </button>
                </div>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table] ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {forms[table](type, data, setOpen, relatedData)}
                </div>
            ) : (
                <form onSubmit={handleAction} className="p-4">
                    <h1 className="text-2xl font-black mb-2 uppercase text-blue-900 tracking-tight">{type} {table}</h1>
                    <p className="text-sm text-slate-400 mb-8 italic">The official registration form for {table} is being initialized...</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Entry Name</label>
                            <input type="text" placeholder={`Enter ${table} name`} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-all" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-12">
                        <button type="button" onClick={() => setOpen(false)} className="px-8 py-3 bg-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-all">Dismiss</button>
                        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 transition-all">Register Now</button>
                    </div>
                </form>
            )
        ) : "Form not found";
    }

    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor} hover:brightness-95 hover:scale-110 active:scale-90 transition-all shadow-sm cursor-pointer`}
                onClick={() => setOpen(true)}
            >
                {type === 'create' ? (
                    <Plus className="w-5 h-5 text-gray-800" strokeWidth={3} />
                ) : type === 'update' ? (
                    <Edit className="w-4 h-4 text-gray-800" />
                ) : (
                    <Trash2 className="w-4 h-4 text-gray-800" />
                )}
            </button>
            {open && (
                <div className="w-screen h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-md z-[999] flex items-center justify-center p-4 text-left">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 fade-in duration-300">
                        {renderForm()}
                        <div
                            className="absolute top-6 right-6 cursor-pointer p-2 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

