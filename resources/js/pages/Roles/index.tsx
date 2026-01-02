
import TablePagination from '@/components/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';



import { type BreadcrumbItem } from '@/types';
import {  Role } from '@/types/roles_permission';

import { Head, Link, router,  usePage } from '@inertiajs/react';


import { useEffect } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Roles({ roles }: { roles: Role }) {


    const { flash } = usePage<{ flash: { message?: string } }>().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message])

    function deleteRole(id: number){
        if(confirm('Are you sure you want to delete this role?')){
            router.delete(`/roles/${id}`);
        }
    }
   

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Roles Management</CardTitle>
                        <CardAction>
                            <Link href={'roles/create'}>
                                <Button variant="default">Add New</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>

                    <hr />
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-slate-500 dark:bg-slate-700">
                                <TableRow>
                                    <TableHead className="font-bold text-white">
                                        ID
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Name
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Permissions
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Created At
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {roles.data.map((role, index) => (
                                    <TableRow className="odd:bg-slate-100 dark:odd:bg-slate-800" key={index}>
                                        <TableCell>{roles.from + index}</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell className='flex items-center flex-wrap gap-2'>{role.permissions.map((per, index) => (
                                            <Badge variant={'outline'} key={index}>{per}</Badge>
                                        ))}</TableCell>
                                        <TableCell>{role.created_at}</TableCell>
                                        <TableCell>
                                            <div>
                                                <Link href={`/roles/${role.id}/edit`}>
                                                    <Button
                                                        className="m-2"
                                                        variant="outline"
                                                        size={'sm'}
                                                         
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size={'sm'}
                                                    onClick={() => deleteRole(role.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {roles.data.length > 0 ? (
                        <TablePagination total={roles.total} to={roles.to} from={roles.from} links={roles.links} />
                    ) : (
                        <div className='flex h-full items-center justify-center'>No Result Found!</div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}


