
   
    import { prisma } from '@/prisma/prisma.config'
    import React from 'react'
        
        // pagina para presentar datos de las marcas en tablas.
        export default async function page() {
            // datos de las marcas
            const vehiculos = await prisma.vehicle.findMany();
            const marcas = await prisma.brand.findMany();
            const modelos = await prisma.model.findMany();
            const combustible = await prisma.fuelType.findMany();
            const tipodevehiculos = await prisma.vehicleType.findMany();

            
    
          return (
            <div className='w-full space-y-4'> 
                <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Lista de vehiculos</h1>
               
                </div>
              
    
                <div className="flex flex-col">
    <div className=" overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-300">
                <table className=" min-w-full  rounded-xl">
                    <thead>
                        <tr className="bg-gray-50">
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Descripcion</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Numero de chasis</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Numero de motor</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Placa</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Tipo de vehiculo</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Marca</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Modelo</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Combustible</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado</th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                        {vehiculos.map((vehiculo) => (
                            <tr key={vehiculo.id}>
                            
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{vehiculo.id}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculo.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculo.chassisNumber}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculo.engineNumber}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculo.plateNumber}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{tipodevehiculos.find(tipo => tipo.id === vehiculo.vehicleTypeId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{marcas.find(marca => marca.id === vehiculo.brandId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{modelos.find(modelo => modelo.id === vehiculo.modelId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{combustible.find(combustible => combustible.id === vehiculo.fuelTypeId)?.description}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculo.status}</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-4">
<button 
  onClick={() => console.log(`Delete vehicle with ID: ${vehiculo.id}`)}
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
    