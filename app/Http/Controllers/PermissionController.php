<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    //
    public function index()
    {
        $permissions = Permission::latest()->paginate(5)->withQueryString();
        $permissions->getCollection()->transform(function ($permissions){
            return [
                'id' => $permissions->id,
                'name' => $permissions->name,
                'created_at' => $permissions->created_at->format('d-m-Y'),  
            ];
        });

        
        return Inertia::render('Permissions/index', [
            'permissions' => $permissions
        ]);
    }
    
    public function store(Request $request)
    {
        Permission::create($request->validate([
            'name' => 'required', 'string', 'max:50', 'unique:permissions,name'
        ]));

        return to_route('permissions.index')->with('message', 'Permission created successfully');
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->validate([
            'name' => 'required', 'string', 'max:50', 'unique:permissions,name' . $permission->id
        ]));
 
        return to_route('permissions.index')->with('message', 'Permission updated successfully');
    }
    
    public function destroy(Permission $permission)
    {
        $permission->delete();
 
        return to_route('permissions.index')->with('message', 'Permission deleted successfully');
    }
}
