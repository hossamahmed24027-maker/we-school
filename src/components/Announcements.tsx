'use client'

import { Volume2, Clock, MoreHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

// Mock Data
const announcements = [
    {
        id: 1,
        title: 'Midterm Results Out',
        time: '2 hours ago',
        description: 'The results for the midterm exams are now available on the portal.',
        tag: 'Academic',
        emoji: '📚',
    },
    {
        id: 2,
        title: 'New Library Hours',
        time: 'Yesterday',
        description: 'Library hours will be extended until 8 PM for the upcoming exam season.',
        tag: 'Updates',
        emoji: '📖',
    },
    {
        id: 3,
        title: 'Sports Day Reminder',
        time: '2 days ago',
        description: "Don't forget to register for the annual sports day events.",
        tag: 'Event',
        emoji: '🏆',
    }
]

export default function Announcements() {
    const [items, setItems] = useState(announcements)
    const [menuOpen, setMenuOpen] = useState(false)

    const dismiss = (id: number) => {
        setItems(items.filter(a => a.id !== id))
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-fit hover:shadow-xl transition-all duration-300 relative group">
            {/* Background pattern */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-50/50 rounded-full -mr-16 -mb-16 blur-2xl group-hover:bg-yellow-100 transition-colors pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                        <Volume2 className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-black text-blue-900 tracking-tight">Announcements</h1>
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
                                📢 Post Announcement
                            </button>
                            <Link href="/list/announcements" className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📋 View All
                            </Link>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-all" onClick={() => { setItems([]); setMenuOpen(false) }}>
                                🗑️ Clear All
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Latest Updates</h2>
                    <Link href="/list/announcements" className="text-[10px] bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-full font-black hover:bg-yellow-500 hover:text-white transition-all active:scale-95">
                        View All →
                    </Link>
                </div>

                {items.length === 0 && (
                    <div className="text-center py-8 text-slate-300">
                        <p className="text-3xl mb-2">📭</p>
                        <p className="text-xs font-bold">No announcements</p>
                    </div>
                )}

                {items.map((ann) => (
                    <div key={ann.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group/item relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); dismiss(ann.id) }}
                            className="absolute top-3 right-3 opacity-0 group-hover/item:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500"
                        >
                            <X className="w-3 h-3" />
                        </button>
                        <div className="flex items-start gap-3 mb-2">
                            <span className="text-xl leading-none">{ann.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-sm font-black text-blue-900 group-hover/item:text-blue-600 transition-colors truncate">
                                        {ann.title}
                                    </h1>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight bg-white px-2 py-0.5 rounded-lg border border-slate-100 flex-shrink-0">
                                        {ann.tag}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[10px] font-bold">{ann.time}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{ann.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
