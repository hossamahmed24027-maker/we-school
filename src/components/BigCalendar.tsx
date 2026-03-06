'use client'

import { useState } from 'react'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

// Mock Schedule Data based on the video
const calendarEvents = [
    {
        title: 'Math',
        allDay: false,
        start: new Date(2024, 7, 12, 8, 0),
        end: new Date(2024, 7, 12, 8, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2024, 7, 12, 9, 0),
        end: new Date(2024, 7, 12, 9, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2024, 7, 12, 10, 0),
        end: new Date(2024, 7, 12, 10, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2024, 7, 12, 11, 0),
        end: new Date(2024, 7, 12, 11, 45),
    },
    {
        title: 'Chemistry',
        allDay: false,
        start: new Date(2024, 7, 13, 8, 0),
        end: new Date(2024, 7, 13, 8, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 13, 9, 0),
        end: new Date(2024, 7, 13, 9, 45),
    },
]

export default function BigCalendar() {
    const [view, setView] = useState<View>(Views.WORK_WEEK)

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView)
    }

    return (
        <div className="h-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 overflow-hidden">
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                views={['work_week', 'day']}
                view={view}
                onView={handleOnChangeView}
                min={new Date(2025, 1, 0, 8, 0, 0)}
                max={new Date(2025, 1, 0, 17, 0, 0)}
                style={{ height: "100%" }}
                className="calendar-custom font-sans font-bold"
            />
        </div>
    )
}
