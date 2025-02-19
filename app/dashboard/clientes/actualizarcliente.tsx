'use client'

import { Button } from "@/components/ui/button"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select";
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
import { clienteSchema, ClienteSchemaForm } from "@/lib/form/clientes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Customer } from "@prisma/client";

export function ActualizarCliente({
    cliente
}: { cliente: Customer }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ClienteSchemaForm>({
        resolver: zodResolver(clienteSchema),
        defaultValues: {
            id: cliente.id,
            name: cliente.name, documentId: cliente.documentId, creditCard: cliente.creditCard,
            creditLimit: cliente.creditLimit, personType: cliente.personType, status: cliente.status
        },
    });
    
    const onSubmit = async (data: ClienteSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/cliente/actualizar", {
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
            console.log("Cliente actualizado con éxito");
            toast({
                title: "Actualizar Cliente",
                description: "La Cliente ha sido actualizado correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al actualizar Cliente",
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
            <DialogContent className="sm:max-w-[625px] lg:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Cliente</DialogTitle>
                    <DialogDescription>
                        Llenar para actualizar este Cliente
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: Juan Perez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="documentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Documento</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="creditCard"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Tarjeta de Crédito</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 1234567890123456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="creditLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Limite de Crédito</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="ex: 1000"
                                                {...field}
                                                value={field.value ? Number(field.value) : 0}
                                                onChange={(event) => field.onChange(Number(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="personType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Persona</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de persona" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Física">Física</SelectItem>
                                                    <SelectItem value="Jurídica">Jurídica</SelectItem>
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
                                        <FormLabel>Estado</FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Activo">Activo</SelectItem>
                                                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Actualizar Cliente'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

