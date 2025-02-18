
   
    import { prisma } from '@/prisma/prisma.config'
    import React from 'react'
// Remove unused import since BorraraInspecciones is not being used in this file
        
        // pagina para presentar datos de las marcas en tablas.
        export default async function page() {
            // datos de las marcas
            const empleados = await prisma.employee.findMany();
            const clientes = await prisma.customer.findMany();
            const vehiculos = await prisma.vehicle.findMany();
            const inspecciones = await prisma.inspection.findMany();
            
    
          return (
            <div className='w-full space-y-4'> 
                <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de inspecciones</h1>
               
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
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Choques</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Cantidad de combustible</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Daño de goma</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Robo</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Daño de vidrio</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Daño de goma</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Inspeccion</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                        {inspecciones.map((inspeccion) => (
                            <tr key={inspeccion.id}>
                            
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{inspeccion.id}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleados.find(empleado => empleado.id === inspeccion.employeeId)?.name}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.inspectionDate.toLocaleString()}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculos.find(vehiculo => vehiculo.id === inspeccion.vehicleId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{clientes.find(cliente => cliente.id === inspeccion.customerId)?.name}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.scratches}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.fuelAmount}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.hasSpareTire}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.hasGlassDamage}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.hasJack}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.hasGlassDamage}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{inspeccion.hasSpareTire}</td>

                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
                            <button 
onClick={() => console.log(`Delete inspection ${inspeccion.id}`)}
  className="text-red-600 hover:text-red-800"
>
  Delete
</button>
           
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
    