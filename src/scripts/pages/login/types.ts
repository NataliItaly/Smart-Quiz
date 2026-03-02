export interface User {
    name: string;
    email?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export type SubmitHandler = (data: LoginData | RegisterData) => void; // for the func-s that forms will call on submit