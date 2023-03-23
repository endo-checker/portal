export type PatientEntry = {
    iconColor: string | undefined;
    id: string;
    givenNames: string;
    familyName: string;
    email: string;
    createdAt: number;
    dateOfBirth: number;
    risk: string;
}

export type User = {
    [key: string]: string | number | undefined;
}