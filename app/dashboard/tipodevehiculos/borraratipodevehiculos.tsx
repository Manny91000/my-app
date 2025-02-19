'use client'

import React, { useState } from 'react';
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

export default function BorraraTipoDeVehiculo({ tipodevehiculoId }: { tipodevehiculoId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter ();
       
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/tipodevehiculo/eliminar?id=${tipodevehiculoId}`, {
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
      console.log("Tipo de vehiculo eliminado con éxito");
      toast({
        title: "Eliminar tipo de vehiculo",
        description: "El tipo de vehiculo ha sido eliminado correctamente",
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      toast({

        variant: 'destructive',
        title: "Error al agregar Tipo De Vehiculo",
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
          <DialogTitle>Borrar las inspecciones </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de querer eliminar las inspecciones ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>

          <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
          </DialogClose>

          <Button onClick={onSubmit}
          >
            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};