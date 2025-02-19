
import { prisma } from '@/prisma/prisma.config'
import React from 'react'
import { AddCliente } from './addclientes';
import BorrarCliente from './borraraclientes';
import { ActualizarCliente } from './actualizarcliente';
        
export default async function page() {
// datos de las marcas
const clientes = await prisma.customer.findMany();


    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de clientes</h1>

                <AddCliente />
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
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Tarjeta de credito</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Limite de credito</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Tipo de persona</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Acciones</th>
                
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300 ">
                                    {clientes.map((cliente) => (
                                        <tr key={cliente.id}>
                
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{cliente.id}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.name}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.documentId}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.creditCard}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.creditLimit}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.personType}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{cliente.status}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                                                <ActualizarCliente cliente={cliente} />
                                                
                                                <BorrarCliente clienteId={cliente.id} />
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

