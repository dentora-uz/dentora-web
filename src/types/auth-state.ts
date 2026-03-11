export type UserInfoType = {
    email: string | null,
    username: string | null,
}

export interface AuthState {
    role: null | string;
    setRole: (role: string) => void;
}