'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, GraduationCap, Users, ShieldCheck, UserCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student' | 'parent'>('admin');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating a professional login delay
        setTimeout(() => {
            setIsLoading(false);
            toast.success(`Welcome back! Logged in as ${selectedRole.toUpperCase()} 🚀`);

            // In a real app, this would set a cookie/token
            // For now, we guide the user to the dashboard
            router.push('/admin');
        }, 1500);
    };

    const roles = [
        { id: 'admin', label: 'Administrator', icon: ShieldCheck, color: 'from-blue-600 to-indigo-600' },
        { id: 'teacher', label: 'Faculty Staff', icon: Users, color: 'from-purple-600 to-pink-600' },
        { id: 'student', label: 'Active Student', icon: GraduationCap, color: 'from-emerald-500 to-teal-600' },
        { id: 'parent', label: 'Guardian/Parent', icon: UserCircle, color: 'from-orange-500 to-amber-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* BACKGROUND IMAGE - Cinematic & Premium */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login_bg.png"
                    alt="School Dashboard"
                    fill
                    className="object-cover opacity-30 blur-[2px] transition-all duration-700"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* FLOATING DECOR */}
            <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />

            {/* LOGIN CONTAINER */}
            <div className="relative z-10 w-full max-w-[1100px] flex flex-col lg:flex-row bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-700">

                {/* LEFT SIDE: BRANDING & IDENTITY */}
                <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                    <div>
                        <div className="flex items-center gap-3 mb-10 group cursor-default">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                                <Sparkles className="text-white w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white tracking-tight leading-none uppercase">WE Academy</h1>
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Excellence in Education</p>
                            </div>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight max-w-[350px]">
                            Unlock your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Educational</span> Journey.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-[400px]">
                            Access 25+ features designed to manage student progress, faculty records, and academic milestones in one professional ecosystem.
                        </p>
                    </div>

                    <div className="mt-12 hidden lg:block">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 max-w-max">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i * 12}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-wide">+1.2k Active Staff Using Dashboard Today</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: INTERACTIVE AUTH FORM */}
                <div className="lg:w-1/2 p-10 lg:p-16 bg-white/[0.02]">
                    <div className="mb-10">
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">System Access</h3>
                        <p className="text-slate-400 text-sm font-medium">Please select your role and enter credentials.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* ROLE SELECTOR GRID */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id as any)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 group ${selectedRole === role.id
                                            ? `bg-gradient-to-br ${role.color} border-transparent shadow-lg text-white`
                                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                        }`}
                                >
                                    <role.icon className={`w-5 h-5 ${selectedRole === role.id ? 'animate-bounce' : ''}`} />
                                    <span className="text-[10px] font-black uppercase tracking-wider">{role.id}</span>
                                </button>
                            ))}
                        </div>

                        {/* INPUT FIELDS */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute -top-2 left-4 bg-slate-950/0 px-2 group-focus-within:text-blue-400 transition-colors">Credential Email</label>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 transition-all focus-within:border-blue-500/50 group">
                                    <Mail className="w-5 h-5 text-slate-500 mr-3 group-focus-within:text-blue-400 transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="jane.doe@we-edu.com"
                                        className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute -top-2 left-4 bg-transparent px-2 group-focus-within:text-blue-400 transition-colors">Secure Keyword</label>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 transition-all focus-within:border-blue-500/50">
                                    <Lock className="w-5 h-5 text-slate-500 mr-3 group-focus-within:text-blue-400 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 font-medium"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600 transition-all cursor-pointer" />
                                <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-medium">Keep me secure</span>
                            </label>
                            <button type="button" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-tight">Need assistance?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white p-5 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Verify & Enter Gateway</span>
                                    <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-700" />
                        </button>

                        <p className="text-center text-slate-500 text-xs mt-8">
                            By entering the gateway, you agree to our <span className="text-slate-300 font-bold border-b border-slate-700 cursor-pointer">Terminal Policy</span>.
                        </p>
                    </form>
                </div>
            </div>

            {/* FOOTER CREDITS */}
            <div className="absolute bottom-6 flex flex-col items-center gap-2">
                <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">Institutional Node v4.0.2 // WE Secure Systems</p>
            </div>
        </div>
    );
}
