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
  


export default function borraracombustible({ combustibleId }: { combustibleId: number }) {
    const borraracombustible = () => {
        console.log(combustibleId);
        
    }
  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>
        Elmininar combustible
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Borrar el combustible</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de querer eliminar el combustible ?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>

        <DialogClose className='py-2 px-4 border rounded'>
            Cancelar
        </DialogClose>

        <Button onClick={borraracombustible}
        >
            Eliminar
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}