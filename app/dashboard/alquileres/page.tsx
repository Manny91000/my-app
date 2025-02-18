
   
    import { prisma } from '@/prisma/prisma.config'
    import React from 'react'
     import BorraraAlquiler  from './borraralquiler';
import { AddAlquiler } from './addalquiler';
        
        // pagina para presentar datos de las marcas en tablas.
        export default async function page() {
            // datos de las marcas
            const alquiler = await prisma.rent.findMany();
            const empleados = await prisma.employee.findMany();
            const clientes = await prisma.customer.findMany();
            const vehiculos = await prisma.vehicle.findMany();
            
    
          return (
            <div className='w-full space-y-4'> 
                <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de los alquileres</h1>
               <AddAlquiler />
                </div>
              
    
                <div className="flex flex-col">
    <div className=" overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-300">
                <table className=" min-w-full  rounded-xl">
                    <thead>
                        <tr className="bg-gray-50">
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Empleado</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Vehiculo</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Cliente</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Dia de renta</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Dia de retorno</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Comentario</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Dia</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Diario</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                        {alquiler.map((alquiler) => (
                            <tr key={alquiler.id}>
                            
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{alquiler.id}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleados.find(empleado => empleado.id === alquiler.employeeId)?.name}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.status}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculos.find(vehiculo => vehiculo.id === alquiler.vehicleId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{clientes.find(cliente => cliente.id === alquiler.customerId)?.name}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.rentDate.toLocaleString()}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.returnDate.toLocaleString()}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.comments}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.days}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.dailyRate}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                                <BorraraAlquiler alquilerId = {alquiler.id} />
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
          )
          
        }
    