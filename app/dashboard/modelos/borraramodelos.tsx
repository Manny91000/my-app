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
  
export default function BorrarModelos({ modelosId }: { modelosId: number }) {
    const BorraraModelos = () => {
        console.log(modelosId);
        
    }
  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar modelos
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Borrar los modelos </DialogTitle>
      <DialogDescription>
        ¿Estás seguro de querer eliminar los modelos ?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>

        <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
        </DialogClose>

        <Button onClick={BorraraModelos}
        >
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}