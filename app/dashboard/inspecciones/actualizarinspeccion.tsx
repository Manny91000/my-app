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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { inspeccionSchema, InspeccionSchemaForm } from "@/lib/form/inspecciones";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Customer, Employee, Inspection, Vehicle } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function ActualizarInspeccion({
    inspeccion,
    vehiculos,
    clientes,
    empleados,
}: {
    inspeccion: Inspection
    vehiculos: Vehicle[],
    clientes: Customer[],
        empleados: Employee[],
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<InspeccionSchemaForm>({
        resolver: zodResolver(inspeccionSchema),
        defaultValues: {
            id: inspeccion?.id,
            vehicleId: inspeccion?.vehicleId, customerId: inspeccion?.customerId, transactionId: inspeccion?.transactionId,
            scratches: inspeccion?.scratches, fuelAmount: inspeccion?.fuelAmount,
            hasSpareTire: inspeccion?.hasSpareTire, hasJack: inspeccion?.hasJack, hasGlassDamage: inspeccion?.hasGlassDamage,
            tireStatus: inspeccion?.tireStatus, inspectionDate: inspeccion?.inspectionDate,
            status: inspeccion?.status, employeeId: inspeccion?.employeeId,
        },
    });
    
    const onSubmit = async (data: InspeccionSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/inspeccion/actualizar", {
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
            console.log("Inspeccion actualizada con éxito");
            toast({
                title: "Actualización de Inspeccion",
                description: "La Inspeccion ha sido actualizada correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al actualizar Inspeccion",
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
            <DialogContent className="sm:max-w-[425px] lg:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Inspeccion</DialogTitle>
                    <DialogDescription>
                        Llenar para actualizar esta Inspeccion
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
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {vehiculos.map((vehiculo) => (
                                                        <SelectItem
                                                            key={vehiculo.id}
                                                            value={vehiculo.id.toString()}
                                                        >
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
                                name="customerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
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
                                                            value={empleado.id.toString()}
                                                        >
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
                                name="fuelAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad de Combustible</FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona cantidad de combustible" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="1/4">1/4</SelectItem>
                                                    <SelectItem value="1/2">1/2</SelectItem>
                                                    <SelectItem value="3/4">3/4</SelectItem>
                                                    <SelectItem value="full">Full</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tireStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Info de Llantas</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="ex: Llantas rotas" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="inspectionDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Inspection</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="date"
                                                placeholder="dd/mm/aaaa"
                                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
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
                                            <Select {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                    <SelectItem value="Completado">Completado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="scratches"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Escápulas</FormLabel> */}
                                        <FormControl className="">
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="scratches"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="scratches" className="">
                                                    <p
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Escápulas
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay escápulas en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasSpareTire"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasSpareTire"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasSpareTire" className="">
                                                    <p
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Llanta Extra
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay llanta extra en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasJack"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasJack"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasJack" className="">
                                                    <p
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Jack
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay Jack en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasGlassDamage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasGlassDamage"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasGlassDamage" className="">
                                                    <p
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Daño de Visión
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay daño de visión en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Actualizar Inspeccion'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

