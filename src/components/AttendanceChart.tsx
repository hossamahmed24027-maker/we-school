'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const data = [
    { name: 'Mon', present: 60, absent: 40 },
    { name: 'Tue', present: 70, absent: 60 },
    { name: 'Wed', present: 90, absent: 75 },
    { name: 'Thu', present: 90, absent: 75 },
    { name: 'Fri', present: 65, absent: 55 },
]

export default function AttendanceChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    if (!isMounted) return <div className="w-full h-[450px] bg-white rounded-3xl animate-pulse" />

    return (
        <div className="bg-white rounded-3xl w-full h-full p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-black text-blue-900 tracking-tight">Attendance Statistics</h1>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all active:scale-90"
                    >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-44 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            <Link href="/list/attendance" className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                👁️ View Full Attendance
                            </Link>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📊 Export Report
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                🔄 This Month
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} tickLine={false} />
                        <YAxis axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                        <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: '0px', paddingBottom: '30px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }} />
                        <Bar dataKey="present" fill="#FAE27C" legendType="circle" radius={[6, 6, 0, 0]} barSize={12} />
                        <Bar dataKey="absent" fill="#C3EBFA" legendType="circle" radius={[6, 6, 0, 0]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
