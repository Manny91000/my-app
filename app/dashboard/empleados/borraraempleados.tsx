'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

export default function BorrarEmpleado({ empleadoId }: { empleadoId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter ();
       
  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/empleado/eliminar?id=${empleadoId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      setIsOpen(false);
      console.log("Empleado agregado con éxito");
      toast({
        title: "Eliminar empleado",
        description: "El Empleado ha sido eliminado correctamente",
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: "Error al agregar Empleado",
        description: (error as Error).message
      })

    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrar Empleado </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de querer eliminar esta Empleado ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>

          <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
          </DialogClose>

          <Button onClick={onSubmit} disabled={isLoading}
          >
            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
