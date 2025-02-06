import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Página de Vehículos
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Explora nuestra selección de vehículos.
        </p>

        {/* Aquí puedes agregar contenido dinámico, como una lista de vehículos */}
        {/* Ejemplo: */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2 text-gray-800">
              Vehículo 1 Nissan
            </h2>
            <p className="text-gray-600"></p>
            <p>
              Nissan GT-R
              Tipo: SUV compacto
              Motor:V6
              2.0L gasolina de 180 CV o 210 CV
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Detalles del precio
              <span className="ml-2 text-sm font-bold text-white-600">
                $12,000
              </span>
            </button>
            {/* Agrega más botones de acción aquí */}
           </div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2 text-white-800">
              Vehículo 2 Honda
            </h2>
            <p className="text-gray-600"></p>
            <p>
              Honda CR-V
              Tipo: SUV compacto
              Motor:1.5 VTEC turbo
              1.8L gasolina de 140 CV o 160 CV
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Detalles del precio
              <span className="ml-2 text-sm font-bold text-white-600">
                $15,000
              </span>
            </button>
          </div>
          {/* Agrega más contenedores de vehículo aquí */}
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2 text-gray-800">
              Vehículo 3 Toyota
            </h2>
            <p className="text-gray-600"></p>
            <p>
              Toyota Highlander
              Tipo: SUV compacto
              Motor:1.8 V6 turbo
              2.0L gasolina de 180 CV o 210 CV
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Detalles del precio
              <span className="ml-2 text-sm font-bold text-white-600">
                $18,000
              </span>
            </button>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2 text-gray-800">
              Vehículo 4 ford
            </h2>
            <p className='text-red-100'>
              Este vehículo está en venta en promoción!
              
            </p>
        </div>
        </div>
      </div>
  )
}
