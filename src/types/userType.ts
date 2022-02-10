

export interface UserSignupData {
    firstName: string;
    lastName: string;
    // imageUrl: string;
    email: string;
    userName: string;
    password: string;
    id: string;
}

export interface User {
    id: number | undefined;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    
}

export interface UserUpdateData {
    email: User["email"];
    firstName: User["firstName"];
    lastName: User["lastName"];
    // imageUrl: User["imageUrl"];
}

export interface LoginData {
    username: string;
    password: string;
}