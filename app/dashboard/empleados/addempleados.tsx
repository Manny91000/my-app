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
import { empleadoSchema, EmpleadoSchemaForm } from "@/lib/form/empleados";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export function AddEmpleado() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form  = useForm<EmpleadoSchemaForm>({
        resolver: zodResolver(empleadoSchema),
        defaultValues: {
          name: "", email: "", password: "", workShift: "Diurna",
            status: "Activo", documentId: "", hireDate: new Date(),
            role: "Asistente", commissionPct: 0
        },
    });
    
    const onSubmit = async (data: EmpleadoSchemaForm) => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/empleado/crear", {
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
            console.log("Empleado agregada con éxito");
            toast({
                title: "Empleado Agregada",
                description: "La Empleado ha sido agregada correctamente",
            });

            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error al agregar Empleado",
                description: (error as Error).message
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir Empleado</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir Empleado</DialogTitle>
                    <DialogDescription>
                        Llenar para agregar una nueva Empleado
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input autoComplete='additional-name' type="email" placeholder="ex: juanperez@gmail.com" {...field} />
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
                                        <Input type="text" placeholder="ex: 00100759932" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workShift"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horario de Trabajo</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un horario de trabajo" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Diurna">Diurna</SelectItem>
                                                <SelectItem value="Nocturna">Nocturna</SelectItem>
                                                <SelectItem value="Mixta">Mixta</SelectItem>
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
                                        <Select
                                            {...field}
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

                        <FormField
                            control={form.control}
                            name="hireDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Contratación</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="dd/mm/aaaa"
                                            {...field}
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
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Asistente">Asistente</SelectItem>
                                                <SelectItem value="Administrador">Administrador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="commissionPct"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comisión</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="ex: 0.00"
                                            {...field}
                                            value={field.value ? Number(field.value) : 0}
                                            onChange={(event) => field.onChange(Number(event.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            {isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : 'Añadir Empleado'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

