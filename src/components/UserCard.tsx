'use client'

import { MoreHorizontal, Users, GraduationCap, UserCheck, Briefcase, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const iconMap = {
    Student: GraduationCap,
    Teacher: Users,
    Parent: UserCheck,
    Staff: Briefcase,
}

const colorMap = {
    Student: 'from-sky-400 to-blue-500',
    Teacher: 'from-purple-400 to-indigo-500',
    Parent: 'from-yellow-400 to-orange-400',
    Staff: 'from-emerald-400 to-teal-500',
}

const bgLight = {
    Student: 'bg-sky-50 border-sky-100',
    Teacher: 'bg-purple-50 border-purple-100',
    Parent: 'bg-yellow-50 border-yellow-100',
    Staff: 'bg-emerald-50 border-emerald-100',
}

const linkMap = {
    Student: '/list/students',
    Teacher: '/list/teachers',
    Parent: '/list/parents',
    Staff: '/admin',
}

export default function UserCard({ type }: { type: 'Student' | 'Teacher' | 'Parent' | 'Staff' }) {
    const Icon = iconMap[type]
    const gradient = colorMap[type]
    const light = bgLight[type]
    const href = linkMap[type]
    const count = 1234 // Mocking
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className={`p-5 rounded-3xl ${light} border flex-1 min-w-[130px] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group cursor-pointer`}>
            {/* Gradient blob decoration */}
            <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`} />

            <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-[10px] bg-white/80 backdrop-blur px-3 py-1 rounded-full text-green-600 font-black border border-green-100 shadow-sm">
                    2024/25
                </span>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-1.5 rounded-xl hover:bg-white/80 transition-all active:scale-90"
                    >
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-8 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            <Link href={href} onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                📋 View All {type}s
                            </Link>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                📊 Export CSV
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                🔄 Refresh
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end gap-3 mb-3 relative z-10">
                <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <h1 className="text-3xl font-black text-slate-800">{count.toLocaleString()}</h1>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] font-black">+12%</span>
                    </div>
                </div>
            </div>

            <Link href={href} className="relative z-10 block">
                <div className="flex items-center justify-between">
                    <h2 className="capitalize text-xs font-black text-slate-500 uppercase tracking-widest">{type}s</h2>
                    <span className="text-[10px] font-black text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                </div>
            </Link>
        </div>
    )
}
