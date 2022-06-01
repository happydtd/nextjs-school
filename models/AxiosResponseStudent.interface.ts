interface Type {
    id: number;
    name: string;
}

interface Course {
    id: number;
    courseId: number;
    name: string;
}

interface Student {
    createdAt: string;
    updatedAt: string;
    id: number;
    email: string;
    name: string;
    country: string;
    profileId: number;
    type: Type;
    courses: Course[];
}

interface Paginator {
    page: number;
    limit: number;
}

export interface AxiosResponseStudentData {
    total: number;
    students: Student[];
    paginator: Paginator;
}

