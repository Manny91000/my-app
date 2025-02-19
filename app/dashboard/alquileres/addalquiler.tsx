'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, 
    SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Customer, Employee, Vehicle } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

export function AddAlquiler({
    vehiculos,
    clientes,
    empleados
}: {
    vehiculos: Vehicle[],
        clientes: Customer[],
    empleados: Employee[],
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form  = useForm<AlquilerSchemaForm>({
        resolver: zodResolver(alquilerSchema),
        defaultValues: {
          employeeId: 0, vehicleId: undefined, customerId: undefined,
            rentDate: new Date(), returnDate: undefined, dailyRate: undefined,
            days: undefined, comments: "", status: "",
        },
    });

    console.log(form.formState.errors);
    
    const onSubmit = async (data: AlquilerSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/alquiler/crear", {
                method: "POST",
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
            console.log("Alquiler agregada con éxito");
            toast({
                title: "Alquiler Agregada",
                description: "La Alquiler ha sido agregada correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al agregar Alquiler",
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir Alquiler</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Añadir Alquiler</DialogTitle>
                    <DialogDescription>
                        Llenar para agregar una nueva Alquiler
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="vehicleId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehículo</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {vehiculos.map((vehiculo) => (
                                                        <SelectItem
                                                            key={vehiculo.id}
                                                            value={vehiculo.id.toString()}>
                                                            {vehiculo.description}
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
                                name="employeeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Empleado</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un empleado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {empleados.map((empleado) => (
                                                        <SelectItem
                                                            key={empleado.id}
                                                            value={empleado.id.toString()}>
                                                            {empleado.name}
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
                                name="customerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un cliente" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {clientes.map((cliente) => (
                                                        <SelectItem
                                                            key={cliente.id}
                                                            value={cliente.id.toString()}
                                                        >
                                                            {cliente.name}
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
                                name="rentDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Alquiler</FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="dd/mm/aaaa"
                                                {...field}
                                                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="returnDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Retorno</FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="dd/mm/aaaa"
                                                {...field}
                                                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dailyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tarifa Diaria</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 1000" {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Días</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 5" {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                                            />
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
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Activo">Activo</SelectItem>
                                                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="comments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comentarios</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} placeholder="Comentarios" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Añadir Alquiler'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

