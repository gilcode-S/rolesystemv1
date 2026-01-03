
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
import { usePermission } from '@/hooks/use-permission';
import AppLayout from '@/layouts/app-layout';



import { type BreadcrumbItem } from '@/types';

import { User } from '@/types/user';

import { Head, Link, router,  usePage } from '@inertiajs/react';


import { useEffect } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({ users }: { users: User }) {

    const {can}= usePermission();
    const { flash } = usePage<{ flash: { message?: string } }>().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message])

    function deleteUser(id: number){
        if(confirm('Are you sure you want to delete this user?')){
            router.delete(`/users/${id}`);
        }
    }
   

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>User Management</CardTitle>
                        <CardAction>
                            {can('create user') && <Link href={'/users/create'}>
                                <Button variant="default">Add New</Button>
                            </Link>}
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
                                        Email
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Roles
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
                                {users.data.map((user, index) => (
                                    <TableRow className="odd:bg-slate-100 dark:odd:bg-slate-800" key={index}>
                                        <TableCell>{users.from + index}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className='flex items-center flex-wrap gap-2'>{user.roles.map((role, index) => (
                                            <Badge variant={'outline'} key={index}>{role}</Badge>
                                        ))}</TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>
                                            <div>
                                                {can('update users') && <Link href={`/users/${user.id}/edit`}>
                                                    <Button
                                                        className="m-2"
                                                        variant="outline"
                                                        size={'sm'}
                                                         
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>}
                                               {can('delete users') &&  <Button
                                                    variant="destructive"
                                                    size={'sm'}
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Delete
                                                </Button>}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {users.data.length > 0 ? (
                        <TablePagination total={users.total} to={users.to} from={users.from} links={users.links} />
                    ) : (
                        <div className='flex h-full items-center justify-center'>No Result Found!</div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}


