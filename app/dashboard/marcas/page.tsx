    
    import { prisma } from '@/prisma/prisma.config'
import React from 'react'
import { AddMarca } from './addmarca';
import BorrarMarca from './borrarmarca';
import { ActualizarMarca } from './actualizarmarca';

export default async function page() {
    // datos de las marcas
    const marcas = await prisma.brand.findMany();

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de las marcas</h1>
                <AddMarca />
            </div>
        
            <div className="flex flex-col">
                <div className=" overflow-auto">
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
                                    {marcas.map((marca) => (
                                        <tr key={marca.id}>
                    
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{marca.id}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{marca.description}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{marca.status}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                                                <ActualizarMarca marca={marca} />
                                                <BorrarMarca marcaId={marca.id} />
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
