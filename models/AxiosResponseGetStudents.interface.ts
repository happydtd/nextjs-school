export interface Type {
    id: number;
    name?: string;
}

interface Course {
    id: number;
    courseId: number;
    name: string;
}

export interface Student {
    createdAt?: string;
    updatedAt?: string;
    id: number;
    email: string;
    name: string;
    country: string;
    profileId?: number;
    type: Type;
    courses?: Course[];
}

interface Paginator {
    page: number;
    limit: number;
}

export interface StudentsData {
    total: number;
    students: Student[];
    paginator: Paginator;
}

export interface AxiosResponseGetStudentsData {
    data: StudentsData;
    code: number;
    msg: string;
}

