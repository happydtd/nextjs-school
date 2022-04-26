interface Teacher {
    createdAt: Date,
    updatedAt: Date,
    id: number,
    country: string,
    courseAmount: number,
    email: string,
    name: string,
    phone: string,
    profileId: number
  }

interface Schedule{
    createdAt: Date,
    updatedAt: Date,
    id: number,
    status: number,
    current: number,
    classTime: string[],
    chapters: Chapter[],
  }

interface Chapter {
    createdAt: Date,
    updatedAt: Date,
    id: number,
    name: string,
    order: number,
    content: string
  }

interface type{
    id: number,
    name: string
  }

interface sales{
    createdAt: Date,
    updatedAt: Date,
    id: number,
    batches: number,
    price: number,
    earnings: number,
    paidAmount: number,
    studentAmount: number,
    paidIds: number[]
  }

  export default interface Course{
    createdAt: string,
    updatedAt: Date,
    id: number,
    cover: string,
    detail: string,
    duration: number,
    durationUnit: number,
    maxStudents: number,
    name: string,
    price: number,
    uid: string,
    star: number,
    startTime: Date,
    status: number,
    scheduleId: number,
    teacherId: number,
    teacher: Teacher,
    schedule: Schedule,
    type: type[],
    sales: sales,
    teacherName: string
  }