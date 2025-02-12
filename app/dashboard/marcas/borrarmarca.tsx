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
  

export default function BorrarMarca( 
    {
        marcaId
    }: {
        marcaId: number;  // id de la marca que se quiere eliminar
    }
) {
    const borrarmarca = () => {
        console.log(marcaId);
        
    }
  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar marca
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Borrar tu marca</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de querer eliminar tu marca ?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>

        <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
        </DialogClose>

        <Button onClick={borrarmarca} 
        >
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}
