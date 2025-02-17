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
  

export default function borraraclientes( 
  {
      clientesId
  }: {
      clientesId: number;  // id del alquiler que se quiere eliminar
  }
) {
    const borraraclientes = () => {
        console.log(clientesId);
        
    }
  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar clientes
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Borrar el cliente</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de querer eliminar al cliente ?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>

        <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
        </DialogClose>

        <Button onClick={borraraclientes}
        >
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}