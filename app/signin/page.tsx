"use client"; // Esto convierte el archivo en un componente del cliente

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({
    // nombre: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const [error, setError] = useState('');

  // Manejar cambios en los input fields
  // Manejar el error
  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('El email no es válido.');
      return;
    }

    // Validación básica
    if ( !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Simulación de envío de datos
    console.log('Datos del formulario:', formData);
    const response = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
        redirect: false, // No redireccionar después de iniciar sesión
    } );

    if ( response?.ok){
     alert ('conexion satisfactoria')
      router.push('/'); // Ir a la página de dashboard si la conexión fue satisfactoria
    } else{
      setError('response?.error');
      return;
    }

    // Limpieza del formulario después de enviarlo
    setFormData({
      // nombre: '',
      email: '',
      password: '',
    });
    alert('Registro exitoso');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='min-h-screen grid place-items-center'>
      <div className='max-w-2xl p-6 border rounded '>
        <h1 className='text-3xl font-bold text-center mb-4'>Inicio</h1>
        <p>
          Inicia sesión para acceder a tus datos y registrarse en nuestra pagina de renta
          de autos.
        </p>
        <br>
        </br>
      {/* <div className = 'grid gap-3'>
        <label htmlFor="nombre">Nombre:</label>
        <input className='py-2 px-3 rounded border' 
          type="text"
          id="nombre"
          name="nombre"
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          value={formData.nombre}
          aria-label="Nombre"
          placeholder="Ingresa tu nombre"
        />
      </div> */}
      <br></br>
      <div  className = 'grid gap-3'>
        <label htmlFor="email">Email:</label>
        <input className='py-2 px-3 rounded border' 
          type="email"
          onChange={(e) => setFormData({...formData,  email: e.target.value})}
          id="email"
          name="email"
          value={formData.email}
          aria-label="Email"
          placeholder="Ingresa tu email"
        />
      </div>
      <br></br>
      <div className = 'grid gap-3'>
        <label htmlFor="password">Contraseña:</label>
        <input className='py-2 px-3 rounded border' 
          type="password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          id="password"
          name="password"
          value={formData.password}
          aria-label="Contraseña"
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <br></br>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='w-full py-2.5 bg-black rounded-sm text-white'  type="submit">
        Registrarse
      </button>
      </div>
    </form>
  );
}


