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
  
export default function BorraraTipoDeVehiculo({ tipodevehiculoId }: { tipodevehiculoId: number }) {
       const [isOpen, setIsOpen ] = useState (false);

           const onSubmit = async () => {
      try {
          const response = await fetch("/api/tipodevehiculo/eliminar?id=" + tipodevehiculoId,{
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          const {message} = await response.json();

          if (!response.ok) {
              throw new Error(message);
          }

          setIsOpen(false);
          console.log("Tipo de vehiculo agregado con éxito");
          toast({
              title: "Tipo De Vehiculo Agregado",
              description: "El tipo de vehiculo ha sido agregada correctamente",
          })
      } catch (error) {
      toast({

          variant: 'destructive',
              title: "Error al agregar Tipo De Vehiculo",
              description: (error as Error).message
          })

      }
  }
  return (
      <Dialog open = {isOpen } onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar inspecciones
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
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}