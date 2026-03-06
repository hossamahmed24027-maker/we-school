'use client'

import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import { Video, Star, CalendarCheck } from 'lucide-react'

export default function StudentPage() {
    return (
        <div className="flex-1 p-4 flex flex-col gap-8 xl:flex-row pb-12">
            <div className="w-full xl:w-2/3 flex flex-col gap-8">
                <h1 className="text-3xl font-black text-blue-900 tracking-tight">Student Dashboard</h1>

                <div className="flex gap-4 flex-wrap">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[200px] flex gap-4 items-center hover:shadow-lg transition-all border-l-8 border-l-blue-500">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><Video className="w-8 h-8" /></div>
                        <div className="flex flex-col"><h1 className="text-2xl font-black text-blue-900">6</h1><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lessons Today</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[200px] flex gap-4 items-center hover:shadow-lg transition-all border-l-8 border-l-emerald-500">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm"><CalendarCheck className="w-8 h-8" /></div>
                        <div className="flex flex-col"><h1 className="text-2xl font-black text-blue-900">92%</h1><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 min-w-[200px] flex gap-4 items-center hover:shadow-lg transition-all border-l-8 border-l-yellow-400">
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl shadow-sm"><Star className="w-8 h-8" /></div>
                        <div className="flex flex-col"><h1 className="text-2xl font-black text-blue-900">4.8</h1><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current GPA</span></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[800px] hover:shadow-xl transition-all">
                    <h1 className="text-xl font-black text-blue-900 mb-6 tracking-tight">My Class Schedule</h1>
                    <BigCalendar />
                </div>
            </div>

            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    )
}
