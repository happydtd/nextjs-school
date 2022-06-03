export interface Type {
    id: number;
    name: string;
}

export interface StudentData {
    name: string;
    email: string;
    country: string;
    profileId: number;
    createdAt: string;
    updatedAt: string;
    id: number;
    type: Type;
    courses: any[];
}

export interface AxiosResponsePostStudentData {
    data: StudentData;
    code: number;
    msg: string;
}