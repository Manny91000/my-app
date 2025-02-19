
import { prisma } from '@/prisma/prisma.config'
    import React from 'react'
    import BorrarCombustible from './borraracombustibles';
import { AddCombustible } from './addcombustibles';
import { ActualizarCombustible } from './actualizarcombustible';
        
        export default async function page() {
            // datos de las marcas
            const combustibles = await prisma.fuelType.findMany();

            return (
                <div className='w-full space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-bold'>Lista de los tipos de combustible
                        </h1>
                      
                        <AddCombustible />
                    </div>
              
                    <div className="flex flex-col">
                        <div className=" overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                                <div className="overflow-hidden border rounded-lg border-gray-300">
                                    <table className=" min-w-full  rounded-xl">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Descripcion </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-300 ">
                                            {combustibles.map((combustible) => (
                                                <tr key={combustible.id}>
                            
                                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{combustible.id}</td>
                                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{combustible.description}</td>
                                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{combustible.status}</td>
                                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                                                        <ActualizarCombustible combustible={combustible} />
                                                        
                                                        <BorrarCombustible combustibleId={combustible.id} />
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
}
    