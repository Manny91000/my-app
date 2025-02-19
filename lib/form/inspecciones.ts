import { z } from "zod";

export const inspeccionSchema = z.object({
        id: z.number().optional(),
    transactionId: z.number({
        required_error: "El id de la transacción es obligatorio.",
        invalid_type_error: "El id de la transacción es invalido.",
    })
        .int({ message: "El id de la transacción debe ser un número entero." })
        .positive({ message: "El id de la transacción debe ser positivo." }),
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
        .int({ message: "El id del cliente debe ser un número entero." })
        .positive({ message: "El id del cliente debe ser positivo." }),
    scratches: z.boolean({
        required_error: "El escáner es obligatorio.",
        invalid_type_error: "El escáner es invalido.",
    }),
    fuelAmount: z.string({
        required_error: "La cantidad de combustible es obligatoria.",
    })
        .nonempty("La cantidad de combustible es obligatoria.")
        .default("1/4"),
    hasSpareTire: z.boolean({
        required_error: "La llanta extra es obligatoria.",
        invalid_type_error: "La llanta extra es invalido.",
    }),
    hasJack: z.boolean({
        required_error: "El estoque es obligatorio.",
        invalid_type_error: "El estoque es invalido.",
    }),
    hasGlassDamage: z.boolean({
        required_error: "El daño de la ventana es obligatorio.",
        invalid_type_error: "El daño de la ventana es invalido.",
    }),
    tireStatus: z.string({
        required_error: "La información de las llantas es obligatoria.",
    }).nonempty("La información de las llantas es obligatoria."),
    inspectionDate: z.coerce.date({
        required_error: "La fecha de inspección es obligatoria.",
        invalid_type_error: "La fecha de inspección es invalido.",
    }),
    employeeId: z.number({
        required_error: "El empleado es obligatorio.",
        invalid_type_error: "El empleado es invalido.",
    })
        .int({ message: "El id del empleado debe ser un número entero." })
        .positive({ message: "El id del empleado debe ser positivo." }),
    status: z.string({
        required_error: "El estado es obligatorio.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
});

export type InspeccionSchemaForm = z.infer<typeof inspeccionSchema>;