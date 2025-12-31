import { Pagination } from "./pagination";

interface SinglePermission {
    id: number;
    name: string;
    created_at: string;
}

export interface Permission extends Pagination {
    data: SinglePermission[];
}