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

import { Head, useForm } from '@inertiajs/react';
import {  Loader2 } from 'lucide-react';
import { useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

export default function Dashboard() {

    const [open, isOpen] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
    })

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        post('/permissions', {
            onSuccess: ()=> {
                reset('name');
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Permission Management</CardTitle>
                        <CardAction>
                            <Button variant="default" onClick={()=> {
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
                                <TableRow className="odd:bg-slate-100 dark:odd:bg-slate-800">
                                    <TableCell>1</TableCell>
                                    <TableCell>Garth?.Dev</TableCell>
                                    <TableCell>12-29-25</TableCell>
                                    <TableCell>
                                        <div>
                                            <Button
                                                className="m-2"
                                                variant="outline"
                                                size={'sm'}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size={'sm'}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
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
                                        value={data.name} onChange={(e)=> setData('name', e.target.value)}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name}  />
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
            </div>
        </AppLayout>
    );
}
