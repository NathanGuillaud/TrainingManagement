import { Authority } from './authority';

export class Member {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    enabled: boolean;
    address: string;
    city: string;
    postalCode: number;
    birthDate: string;
    gender: string;
    authorities: Authority[];
    token: string;
}
