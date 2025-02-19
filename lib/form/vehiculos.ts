import { z } from "zod";

export const vehiculoSchema = z.object({
    id: z.number().optional(),
    description: z.string({
        required_error: "El nombre es obligatorio.",
    }).nonempty("El nombre es obligatorio."),
    chassisNumber: z.string({
        required_error: "El número de carrocería es obligatorio.",
    }).nonempty("El número de carrocería es obligatorio."),
    engineNumber: z.string({
        required_error: "El número de motor es obligatorio.",
    }).nonempty("El número de motor es obligatorio."),
    plateNumber: z.string({
        required_error: "El número de placa es obligatorio.",
    }).nonempty("El número de placa es obligatorio."),
    vehicleTypeId: z.number({
        required_error: "El tipo de vehículo es obligatorio.",
        invalid_type_error: "El tipo de vehículo es invalido.",
    })
        .int({ message: "El id del tipo de vehículo debe ser un número entero." })
        .positive({ message: "El id del tipo de vehículo debe ser positivo." }),
    brandId: z.number({
        required_error: "El marca es obligatorio.",
        invalid_type_error: "El marca es invalido.",
    })
        .int({ message: "El id del marca debe ser un número entero." })
        .positive({ message: "El id del marca debe ser positivo." }),
    modelId: z.number({
        required_error: "El modelo es obligatorio.",
        invalid_type_error: "El modelo es invalido.",
    })
        .int({ message: "El id del modelo debe ser un número entero." })
        .positive({ message: "El id del modelo debe ser positivo." }),
    fuelTypeId: z.number({
        required_error: "El tipo de combustible es obligatorio.",
        invalid_type_error: "El tipo de combustible es invalido.",
    })
        .int({ message: "El id del tipo de combustible debe ser un número entero." })
        .positive({ message: "El id del tipo de combustible debe ser positivo." }),
    status: z.string({
        required_error: "El estado es obligatorio.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
});

export type VehiculoSchemaForm = z.infer<typeof vehiculoSchema>;