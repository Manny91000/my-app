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
import { marcaSchema, MarcaSchemaForm } from "@/lib/form/marca";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

export function AddMarca() {
    const form  = useForm<MarcaSchemaForm>({
        resolver: zodResolver(marcaSchema),
        defaultValues: {
          description: "",
          status: "",
        },
    });
    
    const onSubmit = (data: MarcaSchemaForm) => {
        console.log(data)
    }

  return (
    <Dialog>
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
