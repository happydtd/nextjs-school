interface Skill {
    name: string;
    level: number;
}

interface Teacher {
    createdAt: string;
    updatedAt: string;
    id: number;
    country: string;
    courseAmount: number;
    email: string;
    name: string;
    phone: string;
    profileId: number;
    skills: Skill[];
}

interface Paginator {
    page: number;
    limit: number;
}

export interface AxiosResponseTeacherData {
    total: number;
    teachers: Teacher[];
    paginator: Paginator;
}

