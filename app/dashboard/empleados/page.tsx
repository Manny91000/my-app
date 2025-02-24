
import { prisma } from '@/prisma/prisma.config'
import React from 'react'
import BorrarEmpleado from './borraraempleados';    
import { AddEmpleado } from './addempleados';
import { ActualizarEmpleado } from './actualizarempleado';

export default async function page() {
// datos de las marcas
    const empleados = await prisma.employee.findMany();
    const roles = await prisma.role.findMany();

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de empleados</h1>

                <AddEmpleado roles={roles} />
            </div>
    
            <div className="flex flex-col">
                <div className=" overflow-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg border-gray-300">
                            <table className=" min-w-full  rounded-xl">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Nombre</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Documento</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Horario</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Comision</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Dia de contrato</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> rol</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Correo</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Acciones</th>
                
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300 ">
                                    {empleados.map((empleado) => (
                                        <tr key={empleado.id}>
                
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{empleado.id}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.name}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.documentId}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.workShift}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.commissionPct}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.hireDate.toLocaleDateString()}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.status}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{roles.find(rol => rol.id === empleado.roleId)?.name}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleado.email}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                                                <ActualizarEmpleado empleado={empleado} roles={roles} />
                                                
                                                <BorrarEmpleado empleadoId={empleado.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


