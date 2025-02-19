import { z } from "zod";

export const alquilerSchema = z.object({
    id: z.number().optional(),
    employeeId: z.number({
        required_error: "El empleado es obligatorio.",
        invalid_type_error: "El empleado es invalido.",
    })
        .int({ message: "El id del empleado debe ser un número entero." })
        .positive({ message: "El id del empleado debe ser positivo." }),
    vehicleId: z.number({
        required_error: "El vehículo es obligatorio.",
        invalid_type_error: "El vehículo es invalido.",
    })
        .int({ message: "El id del vehículo debe ser un número entero." })
        .positive({ message: "El id del vehículo debe ser positivo." }),
    customerId: z.number({
        required_error: "El cliente es obligatorio.",
        invalid_type_error: "El cliente es invalido.",
    })
        .int({ message: "El cliente debe ser un número entero." })
        .positive({ message: "El cliente es debe ser positivo." }),
    rentDate: z.coerce
        .date({
            required_error: "La fecha de alquiler es obligatoria.",
            invalid_type_error: "La fecha de alquiler es invalido.",
        }),
        // .min(today, { message: "La fecha de alquiler no puede ser anterior a la fecha actual." }),
    returnDate: z.coerce.date({
        required_error: "La fecha de retorno es obligatoria.",
        invalid_type_error: "La fecha de retorno es invalido.",
    }),
        // .min(today, { message: "La fecha de retorno no puede ser anterior a la fecha actual." }),
    dailyRate: z.number({
        required_error: "La tarifa diaria es obligatoria.",
        invalid_type_error: "La tarifa diaria es invalido.",
    })
        .positive({ message: "La tarifa diaria debe ser positiva." }),
    days: z.number({
        required_error: "El número de días es obligatorio.",
        invalid_type_error: "El número de días es invalido.",
    })
        .int({ message: "El número de días debe ser un número entero." })
        .positive({ message: "El número de días debe ser positivo." }),
    comments: z.string({
        required_error: "El comentario es obligatorio.",
        invalid_type_error: "El comentario es invalido.",
    }).nonempty("El comentario es obligatorio."),
    status: z.string({
        required_error: "El estado es obligatorio.",
        invalid_type_error: "El estado es invalido.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
}).refine((data) => {
    if (data.rentDate > data.returnDate) {
        return false;
    }

    return true;
}, { message: "La fecha de alquiler debe ser anterior a la fecha de retorno.", path: ["rentDate"] })
    .refine((data) => {
        if (data.returnDate < data.rentDate) {
            return false;
        }

        return true;
    }, { message: "La fecha de retorno debe ser posterior a la fecha de alquiler.", path: ["returnDate"] });

export type AlquilerSchemaForm = z.infer<typeof alquilerSchema>;