"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/classes");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.teacher.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.student.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteParent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.parent.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/list/parents");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteLesson = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.lesson.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/exams");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAssignment = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.assignment.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteResult = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.result.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAttendance = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.attendance.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/attendance");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteEvent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.event.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createSubject = async (
    currentState: CurrentState,
    data: { name: string; teachers: string[] }
) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((id) => ({ id })),
                },
            },
        });

        revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateSubject = async (
    currentState: CurrentState,
    data: { id: number; name: string; teachers: string[] }
) => {
    try {
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((id) => ({ id })),
                },
            },
        });

        revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAnnouncement = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.announcement.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createClass = async (
    currentState: CurrentState,
    data: { name: string; capacity: number; gradeId: number; supervisorId?: string }
) => {
    try {
        await prisma.class.create({
            data: {
                name: data.name,
                capacity: data.capacity,
                gradeId: data.gradeId,
                supervisorId: data.supervisorId || null,
            },
        });

        revalidatePath("/list/classes");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateClass = async (
    currentState: CurrentState,
    data: { id: number; name: string; capacity: number; gradeId: number; supervisorId?: string }
) => {
    try {
        await prisma.class.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                capacity: data.capacity,
                gradeId: data.gradeId,
                supervisorId: data.supervisorId || null,
            },
        });

        revalidatePath("/list/classes");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};
export const createTeacher = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.teacher.create({
            data: {
                id: data.username,
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex.toUpperCase() as "MALE" | "FEMALE",
                birthday: new Date(data.birthday),
                subjects: {
                    connect: data.subjects?.map((id: string) => ({ id: parseInt(id) })) || [],
                },
            },
        });

        revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.teacher.update({
            where: {
                id: data.id,
            },
            data: {
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex.toUpperCase() as "MALE" | "FEMALE",
                birthday: new Date(data.birthday),
                subjects: {
                    set: data.subjects?.map((id: string) => ({ id: parseInt(id) })) || [],
                },
            },
        });

        revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createStudent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.student.create({
            data: {
                id: data.username,
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex.toUpperCase() as "MALE" | "FEMALE",
                birthday: new Date(data.birthday),
                gradeId: parseInt(data.gradeId),
                classId: parseInt(data.classId),
                parentId: data.parentId,
                password: data.password || null,
            },
        });

        revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateStudent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.student.update({
            where: {
                id: data.id,
            },
            data: {
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex.toUpperCase() as "MALE" | "FEMALE",
                birthday: new Date(data.birthday),
                gradeId: parseInt(data.gradeId),
                classId: parseInt(data.classId),
                parentId: data.parentId,
                password: data.password || null,
            },
        });

        revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createParent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.parent.create({
            data: {
                id: data.username,
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
                password: data.password || null,
            },
        });

        revalidatePath("/list/parents");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateParent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.parent.update({
            where: {
                id: data.id,
            },
            data: {
                username: data.username,
                name: data.firstName,
                surname: data.lastName,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
                password: data.password || null,
            },
        });

        revalidatePath("/list/parents");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createLesson = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.lesson.create({
            data: {
                name: data.name,
                day: data.day,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                subjectId: parseInt(data.subjectId),
                classId: parseInt(data.classId),
                teacherId: data.teacherId,
            },
        });

        revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateLesson = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.lesson.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                day: data.day,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                subjectId: parseInt(data.subjectId),
                classId: parseInt(data.classId),
                teacherId: data.teacherId,
            },
        });

        revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createExam = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/exams");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateExam = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.exam.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                title: data.title,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/exams");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createAssignment = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.assignment.create({
            data: {
                title: data.title,
                startDate: new Date(data.startDate),
                dueDate: new Date(data.dueDate),
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAssignment = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.assignment.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                title: data.title,
                startDate: new Date(data.startDate),
                dueDate: new Date(data.dueDate),
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createResult = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.result.create({
            data: {
                score: parseInt(data.score),
                examId: data.examId ? parseInt(data.examId) : null,
                assignmentId: data.assignmentId ? parseInt(data.assignmentId) : null,
                studentId: data.studentId,
            },
        });

        revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateResult = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.result.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                score: parseInt(data.score),
                examId: data.examId ? parseInt(data.examId) : null,
                assignmentId: data.assignmentId ? parseInt(data.assignmentId) : null,
                studentId: data.studentId,
            },
        });

        revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createAttendance = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.attendance.create({
            data: {
                date: new Date(data.date),
                present: data.present === "true" || data.present === true,
                studentId: data.studentId,
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/attendance");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAttendance = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.attendance.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                date: new Date(data.date),
                present: data.present === "true" || data.present === true,
                studentId: data.studentId,
                lessonId: parseInt(data.lessonId),
            },
        });

        revalidatePath("/list/attendance");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createEvent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                classId: data.classId ? parseInt(data.classId) : null,
            },
        });

        revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateEvent = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.event.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                title: data.title,
                description: data.description,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                classId: data.classId ? parseInt(data.classId) : null,
            },
        });

        revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createAnnouncement = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                classId: data.classId ? parseInt(data.classId) : null,
            },
        });

        revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAnnouncement = async (
    currentState: CurrentState,
    data: any
) => {
    try {
        await prisma.announcement.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                classId: data.classId ? parseInt(data.classId) : null,
            },
        });

        revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};
