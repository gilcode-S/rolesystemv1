interface Links {
    url: string | null;
    label: string;
    active: boolean
}

export interface Pagination{
    links: Links[];
    from: number;
    to: number;
    total: number;
}