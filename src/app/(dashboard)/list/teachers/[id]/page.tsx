import React from 'react'
import { MoreHorizontal, Mail, Phone, CalendarDays, MapPin, GraduationCap, Video, BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Announcements from '@/components/Announcements'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function SingleTeacherPage(props: {
    params: Promise<{ id: string }>
}) {
    const { id } = await props.params;
    const teacher = await prisma.teacher.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    subjects: true,
                    lessons: true,
                    classes: true,
                }
            }
        }
    });

    if (!teacher) return notFound();

    return (
        <div className="flex-1 p-4 flex flex-col gap-8 xl:flex-row pb-12">
            {/* LEFT: INFO & CHARTS */}
            <div className="w-full xl:w-2/3 flex flex-col gap-8">

                {/* TOP: INFO CARD */}
                <div className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-100/50 transition-colors"></div>

                    <div className="w-full md:w-1/3 flex justify-center md:block relative z-10">
                        <Image
                            src={teacher.img || "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                            alt="Teacher"
                            width={160}
                            height={160}
                            className="w-40 h-40 rounded-3xl object-cover ring-4 ring-blue-50 shadow-lg group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col gap-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-blue-900 tracking-tight">{teacher.name} {teacher.surname}</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Teacher Dashboard</p>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-full cursor-pointer hover:bg-slate-100 transition-all">
                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Professional educator dedicated to student success and academic excellence.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-sm transition-all">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><Mail className="w-4 h-4" /></div>
                                <span className="text-xs font-bold text-slate-600">{teacher.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-sm transition-all">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><Phone className="w-4 h-4" /></div>
                                <span className="text-xs font-bold text-slate-600">{teacher.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-sm transition-all">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><MapPin className="w-4 h-4" /></div>
                                <span className="text-xs font-bold text-slate-600">{teacher.address}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-sm transition-all">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><CalendarDays className="w-4 h-4" /></div>
                                <span className="text-xs font-bold text-slate-600">Joined {teacher.createdAt.toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM: STATS CARDS */}
                <div className="flex-1 flex gap-4 flex-wrap">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-blue-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><GraduationCap className="w-6 h-6" /></div>
                            <h1 className="text-2xl font-black text-blue-900">{teacher._count.classes}</h1>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classes</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-yellow-400">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl"><BookOpen className="w-6 h-6" /></div>
                            <h1 className="text-2xl font-black text-blue-900">{teacher._count.subjects}</h1>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subjects</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-emerald-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Video className="w-6 h-6" /></div>
                            <h1 className="text-2xl font-black text-blue-900">{teacher._count.lessons}</h1>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lessons</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[130px] flex flex-col gap-2 hover:shadow-lg transition-all border-b-4 border-b-purple-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Clock className="w-6 h-6" /></div>
                            <h1 className="text-2xl font-black text-blue-900">32h</h1>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weekly Hours</span>
                    </div>
                </div>

                {/* SCHEDULE */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h1 className="text-xl font-black text-blue-900 mb-6 tracking-tight">Teacher&apos;s Schedule</h1>
                    <div className="h-[600px] bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold italic">Schedule Component Placeholder (Full Calendar Integration)</p>
                    </div>
                </div>
            </div>

            {/* RIGHT: QUICK LINKS & ANNOUNCEMENTS */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h1 className="text-xl font-black text-blue-900 mb-6 tracking-tight">Shortcuts</h1>
                    <div className="flex gap-4 flex-wrap text-xs text-slate-600">
                        <Link className="p-4 rounded-2xl bg-sky-50 border border-sky-100 font-bold hover:bg-sky-600 hover:text-white transition-all shadow-sm" href="/">Teacher&apos;s Students</Link>
                        <Link className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm" href="/">Teacher&apos;s Lessons</Link>
                        <Link className="p-4 rounded-2xl bg-orange-50 border border-orange-100 font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm" href="/">Teacher&apos;s Classes</Link>
                        <Link className="p-4 rounded-2xl bg-purple-50 border border-purple-100 font-bold hover:bg-purple-600 hover:text-white transition-all shadow-sm" href="/">Teacher&apos;s Exams</Link>
                        <Link className="p-4 rounded-2xl bg-pink-50 border border-pink-100 font-bold hover:bg-pink-600 hover:text-white transition-all shadow-sm" href="/">Teacher&apos;s Assignments</Link>
                    </div>
                </div>
                <Announcements />
            </div>
        </div>
    )
}
