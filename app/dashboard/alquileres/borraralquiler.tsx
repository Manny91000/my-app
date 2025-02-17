'use client'

import React from 'react'
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
  

export default function borraraalquiler( 
  {
      alquilerId
  }: {
      alquilerId: number;  // id del alquiler que se quiere eliminar
  }
) {
    const borraraalquiler = () => {
        console.log(alquilerId);
        
    }
  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar alquiler
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Borrar tu alquiler</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de querer eliminar tu alquiler ?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>

        <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
        </DialogClose>

        <Button onClick={borraraalquiler} 
        >
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}