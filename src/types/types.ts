export type ProjectType = {
    id: string,
    name?: string,
    description?: string,
    status?: boolean

}

export type UserType = {
    id: string;
    name: string;
    surname: string;
    email: string; // Add the email property
}
