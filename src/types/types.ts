import Priority from "../enums/Priority";
import State from "../enums/State";

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
    email: string; 
}

export type UserStoryType = {
    id: string;
    name: string;
    description: string;
    priority: Priority;
    createdDate: number;
    state: State;
    projectName: string;
    projectId?: string;
    ownerId: string;
    type: string;
}
