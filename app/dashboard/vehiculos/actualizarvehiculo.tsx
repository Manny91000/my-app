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
import { vehiculoSchema, VehiculoSchemaForm } from "@/lib/form/vehiculos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Brand, FuelType, Model, Vehicle, VehicleType } from "@prisma/client";

export function ActualizarVehiculo({
    vehiculo,
    tipodevehiculos,
    marcas,
    modelos,
    combustibles,
}: {
    vehiculo: Vehicle;
    tipodevehiculos: VehicleType[],
    marcas: Brand[],
    modelos: Model[],
    combustibles: FuelType[],
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form  = useForm<VehiculoSchemaForm>({
        resolver: zodResolver(vehiculoSchema),
        defaultValues: {
            id: vehiculo.id!,
            description: vehiculo.description, plateNumber: vehiculo.plateNumber,
            chassisNumber: vehiculo.chassisNumber, engineNumber: vehiculo.engineNumber,
            brandId: vehiculo.brandId, modelId: vehiculo.modelId,
            fuelTypeId: vehiculo.fuelTypeId, status: vehiculo.status, vehicleTypeId: vehiculo.vehicleTypeId,
        },
    });
    
    const onSubmit = async (data: VehiculoSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/vehiculo/actualizar", {
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
            console.log("Vehiculo actualizado con éxito");
            toast({
                title: "Vehiculo actualizado con éxito",
                description: "La Vehiculo ha sido actualizado con éxito",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al actualizar Vehiculo",
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
            <DialogContent className="sm:max-w-[625px] md:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Vehiculo</DialogTitle>
                    <DialogDescription>
                        Llenar para actualizar este Vehiculo
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: Mercedes Benz" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="chassisNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Cabecera</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="engineNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Motor</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="plateNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Placa</FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="vehicleTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Vehículo</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {tipodevehiculos.map((tipodevehiculo) => (
                                                        <SelectItem
                                                            key={tipodevehiculo.id}
                                                            value={tipodevehiculo.id.toString()}
                                                        >
                                                            {tipodevehiculo.description}
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
                                name="brandId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marca</FormLabel>
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
                                name="modelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modelo</FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un modelo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {modelos.map((modelo) => (
                                                        <SelectItem
                                                            key={modelo.id}
                                                            value={modelo.id.toString()}
                                                        >
                                                            {modelo.description}
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
                                name="fuelTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Combustible</FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de combustible" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {combustibles.map((combustible) => (
                                                        <SelectItem
                                                            key={combustible.id}
                                                            value={combustible.id.toString()}
                                                        >
                                                            {combustible.description}
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
                                                    <SelectItem value="Disponible">Disponible</SelectItem>
                                                    <SelectItem value="Alquilado">Alquilado</SelectItem>
                                                    <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Actualizar Vehiculo'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

