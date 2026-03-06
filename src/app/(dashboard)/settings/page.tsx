'use client'

import { User, Shield, Lock } from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="flex-1 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-black text-blue-900 mb-8 tracking-tight">Account Settings</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                            <input type="text" defaultValue="John Doe" className="p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                            <input type="email" defaultValue="john@doe.com" className="p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Security
                    </h2>
                    <button className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Lock className="w-5 h-5" /> Change Password
                    </button>
                </section>

                <section className="pt-8 border-t border-slate-50 flex justify-end gap-4">
                    <button className="px-8 py-3 rounded-2xl bg-slate-100 text-slate-400 font-bold hover:bg-slate-200 transition-all">Cancel</button>
                    <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-all">Save Changes</button>
                </section>
            </div>
        </div>
    )
}
