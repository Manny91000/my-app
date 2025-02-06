import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    {/* Barra de navegación */}
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Dashboard</h1>
        {/* Puedes agregar aquí otros elementos de navegación */}
      </div>
    </nav>

    {/* Contenido principal */}
    <div className="container mx-auto p-8 flex-1">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
        <p className="text-gray-600 mb-6">
          Bienvenido al panel de control. Desde aquí puedes gestionar
          diferentes secciones de tu aplicación.
        </p>

        {/* Lista de opciones */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="bg-gray-200 p-6 rounded-lg shadow hover:bg-gray-300 transition duration-300">
          
              <h3 className="text-xl font-medium mb-2">Gestionar Usuarios</h3>
              <p className="text-gray-600">
                Administra la lista de usuarios, sus roles y permisos.
              </p>

          </li>
          <li className="bg-gray-200 p-6 rounded-lg shadow hover:bg-gray-300 transition duration-300">
          
              <h3 className="text-xl font-medium mb-2">
                Gestionar Categorías
              </h3>
              <p className="text-gray-600">
                Crea, edita y elimina categorías de contenido.
              </p>
          </li>
          <li className="bg-gray-200 p-6 rounded-lg shadow hover:bg-gray-300 transition duration-300">
              <h3 className="text-xl font-medium mb-2">Gestionar Posts</h3>
              <p className="text-gray-600">
                Publica, edita y elimina entradas de blog o noticias.
              </p>
            
          </li>
          {/* Agrega más opciones aquí */}
        </ul>
      </div>
    </div>
  </div>
);
}
