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
import { alquilerSchema, AlquilerSchemaForm } from "@/lib/form/alquiler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"

export function AddAlquiler() {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const form  = useForm<AlquilerSchemaForm>({
        resolver: zodResolver(alquilerSchema),
        defaultValues: {
          employeeId: "",
          customerId: "",
          vehicleId: "",
          rentDate: "",
          returnDate: "",
          dailyRate: 0,
          status: "",
        },
    });
    
    const onSubmit = async (data: AlquilerSchemaForm) => {
        try {
            const response = await fetch("/api/alquiler/crear", {
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
            console.log("Alquiler agregado con éxito");
            toast({
                title: "Alquiler Agregado",
                description: "El alquiler ha sido agregada correctamente",
            })
        } catch (error) {
        toast({

            variant: 'destructive',
                title: "Error al agregar Alquiler",
                description: (error as Error).message
            })

        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Añadir Alquiler</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Alquiler</DialogTitle>
          <DialogDescription>
           Llenar para agregar un nuevo alquiler
          </DialogDescription>
        </DialogHeader>

         <Form {...form}>
         <form onSubmit={form.handleSubmit((onSubmit) )} className="space-y-5">
        <FormField
        control={form.control} 
        name="comments"
        render={({field}) => (
            <FormItem>
                <FormLabel>
                    Descripción
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Descripción del alquiler" />
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
                    <Input {...field} placeholder="Estado del alquiler" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />

        <Button type="submit">Añadir alquiler</Button>
         </form>
         </Form>
      </DialogContent>
    </Dialog>
  )
}
