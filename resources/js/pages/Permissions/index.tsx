import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,

    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
import { Permission, SinglePermission } from '@/types/roles_permission';

import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

export default function Permissions({ permissions }: { permissions: Permission }) {

    const [open, isOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { flash } = usePage<{ flash: { message?: string } }>().props;

    useEffect(() => {
        if (flash.message) {
            isOpen(false);
            setOpenEdit(false);
            toast.success(flash.message);
        }
    }, [flash.message])

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        id: 0
    })

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/permissions', {
            onSuccess: () => {
                reset('name');
            }
        })
    }

    function edit(permission: SinglePermission) {
        setData('name', permission.name);
        setData('id', permission.id);
        setOpenEdit(true);
    }

    function update(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/permissions/${data.id}`
        );

    }
    function deletePermission(id: number) {

        destroy(`/permissions/${id}`);

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Permission Management</CardTitle>
                        <CardAction>
                            <Button variant="default" onClick={() => {
                                isOpen(true);
                            }}>Add New</Button>
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
                                        Created At
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {permissions.data.map((permission, index) => (
                                    <TableRow className="odd:bg-slate-100 dark:odd:bg-slate-800" key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>{permission.created_at}</TableCell>
                                        <TableCell>
                                            <div>
                                                <Button
                                                    className="m-2"
                                                    variant="outline"
                                                    size={'sm'}
                                                    onClick={() => edit(permission)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size={'sm'}
                                                    onClick={() => deletePermission(permission.id)}
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
                </Card>

                {/* add new permission dialog model */}
                <Dialog open={open} onOpenChange={isOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Permission </DialogTitle>

                        </DialogHeader>
                        <hr />
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Permission Name</Label>
                                    <Input
                                        id="name"
                                        type='text'
                                        value={data.name} onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                            </div>
                            <DialogFooter className='mt-4'>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Loader2 className='animate-spin'></Loader2>}
                                    <span>Create</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* edit new permission dialog model */}
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Permission </DialogTitle>

                        </DialogHeader>
                        <hr />
                        <form onSubmit={update}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Permission Name</Label>
                                    <Input
                                        id="name"
                                        type='text'
                                        value={data.name} onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                            </div>
                            <DialogFooter className='mt-4'>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Loader2 className='animate-spin'></Loader2>}
                                    <span>Update</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
function put(arg0: string) {
    throw new Error('Function not implemented.');
}

