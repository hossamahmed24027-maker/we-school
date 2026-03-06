'use client'

import { User, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'

export default function ProfilePage() {
    return (
        <div className="p-4 flex flex-col gap-8">
            {/* TOP */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* USER INFO CARD */}
                <div className="w-full lg:w-2/3 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-8">
                    <div className="w-1/3">
                        <Image
                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Profile"
                            width={200}
                            height={200}
                            className="w-full aspect-square rounded-3xl object-cover shadow-lg"
                        />
                    </div>
                    <div className="w-2/3 flex flex-col justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black text-blue-900 tracking-tight">James Wilson</h1>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">Administrator</span>
                        </div>
                        <p className="text-slate-500 font-medium">Senior System Administrator at SchooLama Academy. Managed over 500+ student records and 50+ faculty members.</p>
                        <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-slate-400">
                            <div className="w-full md:w-1/3 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>james@wilson.com</span>
                            </div>
                            <div className="w-full md:w-1/3 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>+1 234 567 890</span>
                            </div>
                            <div className="w-full md:w-1/3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>123 Academy Blvd, Silicon Valley</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOGO / RECENT ACTIVITY */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-100 rotate-3">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-blue-900 italic">SchooLama</h2>
                        <button className="px-6 py-2 bg-slate-50 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">Verified Portal</button>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="flex flex-col xl:flex-row gap-8">
                {/* PERSONAL DETAILS */}
                <div className="w-full xl:w-2/3 flex flex-col gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-black text-blue-900 tracking-tight mb-8">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DetailItem icon={Calendar} label="Date of Birth" value="April 12, 1985" />
                            <DetailItem icon={User} label="Gender" value="Male" />
                            <DetailItem icon={GraduationCap} label="Qualification" value="M.Sc. Information Technology" />
                            <DetailItem icon={BookOpen} label="Department" value="IT & Administration" />
                            <DetailItem icon={Clock} label="Join Date" value="September 2018" />
                        </div>
                    </div>
                </div>
                {/* STATS */}
                <div className="w-full xl:w-1/3 flex flex-col gap-4">
                    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-100 text-white">
                        <h3 className="text-lg font-bold opacity-80 mb-2 uppercase tracking-widest text-xs">Security Status</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-black">Secure</span>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DetailItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all">
            <div className="p-3 bg-blue-50 rounded-xl">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</p>
                <p className="text-slate-700 font-bold">{value}</p>
            </div>
        </div>
    )
}
