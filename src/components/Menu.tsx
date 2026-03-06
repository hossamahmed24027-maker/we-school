'use client'

import {
  BookOpen,
  Calendar,
  GraduationCap,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Video,
  FileText,
  UserCheck,
  CheckSquare,
  Clock,
  LayoutDashboard,
  Trophy
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_ROLE } from '@/lib/constants'

const menuItems = [
  {
    title: 'MAIN MENU',
    items: [
      {
        icon: LayoutDashboard,
        label: 'Home',
        href: '/admin',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: Users,
        label: 'Teachers',
        href: '/list/teachers',
        visible: ['admin', 'teacher'],
      },
      {
        icon: GraduationCap,
        label: 'Students',
        href: '/list/students',
        visible: ['admin', 'teacher'],
      },
      {
        icon: Users,
        label: 'Parents',
        href: '/list/parents',
        visible: ['admin', 'teacher'],
      },
      {
        icon: BookOpen,
        label: 'Subjects',
        href: '/list/subjects',
        visible: ['admin'],
      },
      {
        icon: Video,
        label: 'Classes',
        href: '/list/classes',
        visible: ['admin', 'teacher'],
      },
      {
        icon: FileText,
        label: 'Lessons',
        href: '/list/lessons',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: CheckSquare,
        label: 'Exams',
        href: '/list/exams',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: FileText,
        label: 'Assignments',
        href: '/list/assignments',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: Trophy,
        label: 'Results',
        href: '/list/results',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: UserCheck,
        label: 'Attendance',
        href: '/list/attendance',
        visible: ['admin', 'teacher'],
      },
      {
        icon: Calendar,
        label: 'Events',
        href: '/list/events',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: MessageSquare,
        label: 'Messages',
        href: '/list/messages',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: Clock,
        label: 'Announcements',
        href: '/list/announcements',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      {
        icon: Users,
        label: 'Profile',
        href: '/profile',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: LogOut,
        label: 'Logout',
        href: '/logout',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
]

export default function Menu() {
  const role = APP_ROLE
  const pathname = usePathname()

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((category) => (
        <div className="flex flex-col gap-2" key={category.title}>
          <span className="hidden lg:block text-slate-400 font-bold my-4 px-4 uppercase tracking-widest text-[10px]">
            {category.title}
          </span>
          {category.items.map((item) => {
            if (item.visible.includes(role)) {
              const isActive = pathname === item.href
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center lg:justify-start gap-4 py-3 rounded-xl transition-all duration-200 px-4 group ${isActive
                    ? 'bg-lamaSky text-gray-800 font-bold shadow-sm'
                    : 'text-slate-500 hover:bg-lamaSkyLight'
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-400'} transition-colors`} />
                  <span className="hidden lg:block">
                    {item.label}
                  </span>
                </Link>
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}
