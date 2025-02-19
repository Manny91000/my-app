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
import { tipoVehiculoSchema, TipoVehiculoSchemaForm } from "@/lib/form/tipodevehiculos";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleType } from "@prisma/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export function ActualizarTipoDeVehiculo({
    tipodevehiculo
}: { tipodevehiculo: VehicleType }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form  = useForm<TipoVehiculoSchemaForm>({
        resolver: zodResolver(tipoVehiculoSchema),
        defaultValues: {
         id: tipodevehiculo.id,
          description: tipodevehiculo.description,
          status: tipodevehiculo.status,
        },
    });
    
    const onSubmit = async (data: TipoVehiculoSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/tipodevehiculo/actualizar", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await response.json();

            if (!response.ok) {
                throw new Error(message);
            }

            setIsOpen(false);
            console.log("Tipo de vehiculo actualizada con éxito");
            toast({
                title: "Actualizar Tipo de vehiculo",
                description: "El Tipo de vehiculo ha sido actualizado correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al actualizar Tipo de vehiculo",
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Actualizar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Tipo de vehiculo</DialogTitle>
                    <DialogDescription>
                        Llenar para actualizar una nueva Tipo de vehiculo
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Descripción
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Descripción de la Tipo de vehiculo" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Estado
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Estado de la Tipo de vehiculo" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Actualizar Tipo de vehiculo'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

