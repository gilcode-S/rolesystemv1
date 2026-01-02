import { Pagination } from "./pagination";

interface SinglePermission {
    id: number;
    name: string;
    created_at: string;
}

interface SingleRole { 
    id: number;
    name: string;
    created_at: string;
    permissions: string[];
}

export interface Permission extends Pagination {
    data: SinglePermission[];
}

export interface Role extends Pagination{
    data: SingleRole[];
}