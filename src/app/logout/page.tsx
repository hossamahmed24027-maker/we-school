'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LogOut } from 'lucide-react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Simulating session destruction
        const timer = setTimeout(() => {
            toast.info("Securely logged out. See you soon! 👋");
            router.push('/login');
        }, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
            <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center relative animate-pulse">
                <LogOut className="text-red-500 w-10 h-10 animate-bounce" />
                <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin duration-700" />
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-white tracking-tight uppercase">Closing Session...</h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Wiping local nodes & securing data gateway</p>
            </div>
        </div>
    );
}
