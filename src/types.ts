export type PatientEntry = {
    iconColor: string;
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