import React from 'react'
import { MoreHorizontal, Mail, Phone, CalendarDays, MapPin, GraduationCap, Video, BookOpen, Clock, Heart, Award, Star } from 'lucide-react'
import Image from 'next/image'
import Announcements from '@/components/Announcements'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function SingleStudentPage(props: {
    params: Promise<{ id: string }>
}) {
    const { id } = await props.params;
    const student = await prisma.student.findUnique({
        where: { id },
        include: {
            class: true,
            _count: {
                select: {
                    attendances: true,
                    results: true,
                }
            }
        }
    });

    if (!student) return notFound();

    return (
        <div className="flex-1 p-4 flex flex-col gap-8 xl:flex-row pb-12">
            <div className="w-full xl:w-2/3 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/30 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-emerald-100/50 transition-colors"></div>
                    <div className="w-full md:w-1/3 flex justify-center md:block relative z-10">
                        <Image src={student.img || "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200"} alt="Student" width={160} height={160} className="w-40 h-40 rounded-3xl object-cover ring-4 ring-emerald-50 shadow-lg group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col gap-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-blue-900 tracking-tight">{student.name} {student.surname}</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Grade {student.class.name} Student</p>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-full cursor-pointer hover:bg-slate-100 transition-all"><MoreHorizontal className="w-5 h-5 text-slate-400" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"><Mail className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-slate-600">{student.email || 'N/A'}</span></div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"><Phone className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-slate-600">{student.phone || 'N/A'}</span></div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"><MapPin className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-slate-600">{student.address}</span></div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"><CalendarDays className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-slate-600">Enrolled {student.createdAt.toLocaleDateString()}</span></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex gap-4 flex-wrap">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-emerald-400">
                        <div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Star className="w-6 h-6" /></div><h1 className="text-2xl font-black text-blue-900">4.9</h1></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">GPA</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-blue-400">
                        <div className="flex items-center gap-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Video className="w-6 h-6" /></div><h1 className="text-2xl font-black text-blue-900">18</h1></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lessons</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-yellow-400">
                        <div className="flex items-center gap-3"><div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl"><Award className="w-6 h-6" /></div><h1 className="text-2xl font-black text-blue-900">{student._count.results}</h1></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exams/Results</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-purple-400">
                        <div className="flex items-center gap-3"><div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Heart className="w-6 h-6" /></div><h1 className="text-2xl font-black text-blue-900">{student._count.attendances}</h1></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Attendances</span>
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-1/3 flex flex-col gap-8"><Announcements /></div>
        </div>
    )
}
