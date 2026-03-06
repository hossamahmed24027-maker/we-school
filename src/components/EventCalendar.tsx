'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { MoreHorizontal, CalendarDays, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock Data
const events = [
    {
        id: 1,
        title: 'School Trip',
        time: '12:00 PM - 2:00 PM',
        description: 'Visit to the National Museum for Science Week.',
        type: 'Social',
        color: 'border-blue-400'
    },
    {
        id: 2,
        title: 'Math Exam',
        time: '8:00 AM - 10:00 AM',
        description: 'Midterm mathematics exam for Grade 10.',
        type: 'Academic',
        color: 'border-purple-400'
    },
    {
        id: 3,
        title: 'Football Match',
        time: '3:00 PM - 5:00 PM',
        description: 'Home game against West High School.',
        type: 'Sports',
        color: 'border-emerald-400'
    }
]

export default function EventCalendar() {
    type ValuePiece = Date | null
    type Value = ValuePiece | [ValuePiece, ValuePiece]

    const [value, onChange] = useState<Value>(new Date())
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-fit hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <CalendarDays className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-black text-blue-900 tracking-tight">Academic Schedule</h1>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="bg-slate-50 p-2 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors active:scale-90"
                    >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-44 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📅 Add New Event
                            </button>
                            <Link href="/list/events" className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📋 View All Events
                            </Link>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                🖨️ Print Schedule
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Calendar onChange={onChange} value={value} className="w-full border-none bg-transparent rounded-xl" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Upcoming Events</h2>
                    <Link href="/list/events" className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                        View All →
                    </Link>
                </div>

                <div className="space-y-3">
                    {events.map((event) => (
                        <div key={event.id} className={`p-4 rounded-2xl border-l-4 ${event.color} bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group/item relative overflow-hidden`}>
                            <div className="flex justify-between items-start mb-1.5">
                                <h1 className="text-sm font-black text-blue-900 group-hover/item:text-blue-600 transition-colors">
                                    {event.title}
                                </h1>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight bg-white px-2 py-0.5 rounded-lg border border-slate-100">
                                    {event.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                                <Clock className="w-3 h-3" />
                                <span className="text-[10px] font-bold">{event.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-1">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
