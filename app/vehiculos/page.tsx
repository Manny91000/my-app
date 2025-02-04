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
            <img
              src="https://via.placeholder.com/300x200" // Reemplaza con la URL de la imagen del vehículo
              alt="Vehículo 1"
              className="w-full rounded-lg mb-4"
            />
            <h2 className="text-xl font-medium mb-2 text-gray-800">
              Vehículo 1
            </h2>
            <p className="text-gray-600">Descripción del vehículo 1.</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <img
              src="https://via.placeholder.com/300x200" // Reemplaza con la URL de la imagen del vehículo
              alt="Vehículo 2"
              className="w-full rounded-lg mb-4"
            />
            <h2 className="text-xl font-medium mb-2 text-gray-800">
              Vehículo 2
            </h2>
            <p className="text-gray-600">Descripción del vehículo 2.</p>
          </div>
          {/* Agrega más vehículos aquí */}
        </div>
      </div>
    </div>
  )
}