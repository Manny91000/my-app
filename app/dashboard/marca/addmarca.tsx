'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast";
import { marcaSchema, MarcaSchemaForm } from "@/lib/form/marca";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"

export function AddMarca() {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const form  = useForm<MarcaSchemaForm>({
        resolver: zodResolver(marcaSchema),
        defaultValues: {
          description: "",
          status: "",
        },
    });
    
    const onSubmit = async (data: MarcaSchemaForm) => {
        try {
            const response = await fetch("/api/marca/crear", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const {message} = await response.json();

            if (!response.ok) {
                throw new Error(message);
            }

            setIsOpen(false);
            console.log("Marca agregada con éxito");
            toast({
                title: "Marca Agregada",
                description: "La marca ha sido agregada correctamente",
            })
        } catch (error) {
        toast({

            variant: 'destructive',
                title: "Error al agregar Marca",
                description: (error as Error).message
            })

        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Añadir Marca</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Marca</DialogTitle>
          <DialogDescription>
           Llenar para agregar una nueva marca
          </DialogDescription>
        </DialogHeader>

         <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
        control={form.control} 
        name="description"
        render={({field}) => (
            <FormItem>
                <FormLabel>
                    Descripción
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Descripción de la marca" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />

<FormField
        control={form.control} 
        name="status"
        render={({field}) => (
            <FormItem>
                <FormLabel>
                    Estado
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Estado de la marca" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />

        <Button type="submit">Añadir marca</Button>
         </form>
         </Form>
      </DialogContent>
    </Dialog>
  )
}
