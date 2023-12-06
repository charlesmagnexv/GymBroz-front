export interface InputsLoginDTO {
    email: string,
    password: string,
};

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    profilePicturePath: string | null;
    isAdmin: boolean;
    isActive: boolean;
    isEmailConfirmed: boolean;
}