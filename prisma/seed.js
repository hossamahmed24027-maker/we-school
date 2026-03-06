"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // DELETE ALL DATA FIRST TO AVOID ERRORS
    console.log("Cleaning database...");
    await prisma.attendance.deleteMany();
    await prisma.result.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.event.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.student.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.class.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.admin.deleteMany();
    console.log("Seeding data...");
    // ADMIN
    await prisma.admin.create({
        data: {
            id: "admin1",
            username: "admin1",
        },
    });
    // GRADE
    for (let i = 1; i <= 6; i++) {
        await prisma.grade.create({
            data: {
                level: i,
            },
        });
    }
    // CLASS
    for (let i = 1; i <= 6; i++) {
        await prisma.class.create({
            data: {
                name: `${i}A`,
                capacity: 20,
                gradeId: i,
            },
        });
    }
    // SUBJECT
    const subjectsData = [
        { name: "Mathematics" },
        { name: "English" },
        { name: "Physics" },
        { name: "Chemistry" },
        { name: "Biology" },
        { name: "History" },
        { name: "Geography" },
    ];
    for (const subject of subjectsData) {
        await prisma.subject.create({ data: subject });
    }
    // TEACHER
    for (let i = 1; i <= 15; i++) {
        await prisma.teacher.create({
            data: {
                id: `teacher${i}`,
                username: `teacher${i}`,
                name: `TName${i}`,
                surname: `TSurname${i}`,
                email: `teacher${i}@example.com`,
                phone: `123456789${i}`,
                address: `Address ${i}`,
                bloodType: "A+",
                sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                subjects: { connect: [{ id: (i % 7) + 1 }] },
            },
        });
    }
    // PARENT
    for (let i = 1; i <= 25; i++) {
        await prisma.parent.create({
            data: {
                id: `parentId${i}`,
                username: `parent${i}`,
                name: `PName${i}`,
                surname: `PSurname${i}`,
                email: `parent${i}@example.com`,
                phone: `987654321${i}`,
                address: `Address ${i}`,
            },
        });
    }
    // STUDENT
    for (let i = 1; i <= 50; i++) {
        await prisma.student.create({
            data: {
                id: `student${i}`,
                username: `student${i}`,
                name: `SName${i}`,
                surname: `SSurname${i}`,
                email: `student${i}@example.com`,
                phone: `55555555${i}`,
                address: `Address ${i}`,
                bloodType: "O-",
                sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                parentId: `parentId${Math.ceil(i / 2)}`,
                gradeId: (i % 6) + 1,
                classId: (i % 6) + 1,
            },
        });
    }
    console.log("Seeding completed successfully!");
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
