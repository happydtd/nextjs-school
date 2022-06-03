interface Skill {
    name: string;
    level: number;
}

export interface Teacher {
    createdAt?: string;
    updatedAt?: string;
    id: number;
    country: string;
    courseAmount?: number;
    email: string;
    name: string;
    phone: string;
    profileId?: number;
    skills: Skill[];
}

interface Paginator {
    page: number;
    limit: number;
}

export interface TeacherData {
    total: number;
    teachers: Teacher[];
    paginator: Paginator;
}

export interface AxiosResponseGetTeachersData {
    data: TeacherData;
    code: number;
    msg: string;
}

