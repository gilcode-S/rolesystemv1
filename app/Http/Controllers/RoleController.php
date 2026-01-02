<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Roles/index', [
            'roles' => Role::with(
                'permissions'
            )->paginate(5)->through(function($role){
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'created_at' => $role->created_at->format('d-m-Y'),
                    'permissions' => $role->permissions->pluck('name')
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Roles/create', [
            'permissions' => Permission::all()->pluck('name')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        if($request->has('permissions')){
            $role->syncPermissions($request->permissions);
        };

        return to_route('roles.index')->with('message', 'Role created successfully');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
