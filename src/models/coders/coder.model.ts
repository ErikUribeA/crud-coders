export interface ICoder {
    createdAt: Date;
    name: string;
    avatar: string;
    id: string;
}

export interface ICreate {
    name: string;
    avatar: string;
}