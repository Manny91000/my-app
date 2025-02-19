'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { modeloSchema, ModeloSchemaForm } from "@/lib/form/modelos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Model } from "@prisma/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export function ActualizarModelo({
    modelo, marcas
}: { modelo: Model, marcas: Brand[] }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ModeloSchemaForm>({
        resolver: zodResolver(modeloSchema),
        defaultValues: {
            id: modelo.id,
            description: modelo.description,
            brandId: modelo.brandId,
            status: modelo.status,
        },
    });
    
    const onSubmit = async (data: ModeloSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/modelos/actualizar", {
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
            console.log("Modelo actualizado con éxito");
            toast({
                title: "Actualizar Modelo",
                description: "El Modelo ha sido actualizado correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al actualizar Modelo",
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
                    <DialogTitle>Actualizar Modelo</DialogTitle>
                    <DialogDescription>
                        Llenar para actualizar un nuevo Modelo
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
                                        <Input {...field} placeholder="Descripción de la Modelo" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brandId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Marca
                                    </FormLabel>
                                    <FormControl>
                                        <Select {...field}
                                            value={field.value === undefined ? "" : field.value.toString()}
                                            onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una marca" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {marcas.map((marca) => (
                                                    <SelectItem
                                                        key={marca.id}
                                                        value={marca.id.toString()}
                                                    >
                                                        {marca.description}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                        <Input {...field} placeholder="Estado de la Modelo" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Actualizar Modelo'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

