'use client'

import { Search, Bell, MessageSquare, X, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showMessages, setShowMessages] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New student enrolled: Alice Miller', time: '2 min ago', read: false },
        { id: 2, text: 'Exam results published for Grade 10', time: '1 hour ago', read: false },
        { id: 3, text: 'Parent-Teacher meeting scheduled', time: 'Yesterday', read: true },
    ])

    const messages = [
        { id: 1, from: 'Sarah Jenkins', text: 'Can we reschedule the meeting?', time: '5 min ago', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { id: 2, from: 'Michael Brown', text: 'The lab report is ready for review.', time: '30 min ago', avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ]

    return (
        <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-100">
            {/* SEARCH BAR */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-200 px-3 bg-slate-50 focus-within:ring-blue-400 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search students, teachers..."
                    className="w-[220px] p-2 bg-transparent outline-none text-gray-600 text-sm"
                />
            </div>

            {/* ICONS AND USER */}
            <div className="flex items-center gap-4 justify-end w-full">

                {/* MESSAGES */}
                <div className="relative">
                    <button
                        onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); setShowProfile(false) }}
                        className="bg-slate-50 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm border border-slate-100 active:scale-90"
                    >
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                    </button>
                    {showMessages && (
                        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between p-4 border-b border-slate-50">
                                <h3 className="font-black text-blue-900 text-sm">Messages</h3>
                                <button onClick={() => setShowMessages(false)}><X className="w-4 h-4 text-slate-400" /></button>
                            </div>
                            {messages.map(m => (
                                <div key={m.id} className="flex items-center gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-all border-b border-slate-50 last:border-0">
                                    <Image src={m.avatar} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-xs text-slate-800">{m.from}</p>
                                        <p className="text-xs text-slate-400 truncate">{m.text}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 flex-shrink-0">{m.time}</span>
                                </div>
                            ))}
                            <Link href="/list/messages" className="block text-center py-3 text-xs font-black text-blue-600 hover:bg-blue-50 transition-all" onClick={() => setShowMessages(false)}>
                                View All Messages →
                            </Link>
                        </div>
                    )}
                </div>

                {/* NOTIFICATIONS */}
                <div className="relative">
                    <button
                        onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); setShowProfile(false) }}
                        className="bg-slate-50 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-all shadow-sm border border-slate-100 relative active:scale-90"
                    >
                        <Bell className="w-4 h-4 text-gray-500" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px] font-black">
                            {notifications.filter(n => !n.read).length}
                        </div>
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between p-4 border-b border-slate-50">
                                <h3 className="font-black text-blue-900 text-sm">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)}><X className="w-4 h-4 text-slate-400" /></button>
                            </div>
                            {notifications.map(n => (
                                <div key={n.id} className={`flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-all border-b border-slate-50 last:border-0 ${!n.read ? 'bg-purple-50/50' : ''}`}>
                                    <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${!n.read ? 'bg-purple-500' : 'bg-slate-200'}`} />
                                    <div className="flex-1">
                                        <p className={`text-xs ${!n.read ? 'font-bold text-slate-800' : 'text-slate-500'}`}>{n.text}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                                    </div>
                                    {!n.read && <Check className="w-3 h-3 text-purple-400 flex-shrink-0 mt-1" />}
                                </div>
                            ))}
                            <button
                                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                                className="w-full text-center py-3 text-xs font-black text-purple-600 hover:bg-purple-50 transition-all"
                            >
                                Mark all as read
                            </button>
                        </div>
                    )}
                </div>

                {/* USER PROFILE */}
                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => { setShowProfile(!showProfile); setShowMessages(false); setShowNotifications(false) }}
                    >
                        <div className="flex flex-col text-right">
                            <span className="text-xs leading-3 font-black text-slate-800">John Doe</span>
                            <span className="text-[10px] text-gray-500 font-medium">Admin</span>
                        </div>
                        <Image
                            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100"
                            alt="avatar"
                            width={36}
                            height={36}
                            className="rounded-full object-cover ring-2 ring-white shadow-md group-hover:ring-blue-400 transition-all"
                        />
                    </div>
                    {showProfile && (
                        <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                            <div className="p-4 bg-blue-600 text-white">
                                <p className="font-black text-sm">John Doe</p>
                                <p className="text-xs opacity-80">john@schoolama.com</p>
                            </div>
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setShowProfile(false)}>
                                👤 View Profile
                            </Link>
                            <Link href="/settings" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setShowProfile(false)}>
                                ⚙️ Settings
                            </Link>
                            <div className="border-t border-slate-100" />
                            <Link href="/logout" className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-all" onClick={() => setShowProfile(false)}>
                                🚪 Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
