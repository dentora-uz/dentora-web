export type UserInfoType = {
    email: string | null,
    username: string | null,
}

export interface AuthState {
    token: string | null;
    refreshToken: string | null;
    role: null | string;
    userInfo: UserInfoType,
    setUserInfo: (userInfo: UserInfoType) => void;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    setRefreshToken: (refReshToken: string | null) => void;
    setRole: (role: string) => void;
    changeAuthinticated: (isAuth: boolean) => void;
    logout: () => void;
}