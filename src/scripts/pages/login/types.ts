export interface User {
    name: string;
    email?: string;
}

export interface StoredUser {
    name: string;
    email: string;
    password?: string;
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

// for the func-s that forms will call on submit

export type LoginSubmitHandler = (data: LoginData) => void;
export type RegisterSubmitHandler = (data: RegisterData) => void;