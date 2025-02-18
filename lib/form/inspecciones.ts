import { z } from "zod";

export const inspeccionSchema = z.object({
    vehicleId: z.number().min(1, "El vehículo es requerido"),
    customerId: z.number().min(1, "El cliente es requerido"),
    employeeId: z.number().min(1, "El empleado es requerido"),
    hasScratches: z.boolean(),
    hasFuel: z.boolean(),
    hasSpareWheel: z.boolean(),
    hasJack: z.boolean(),
    hasGlassBreaks: z.boolean(),
    hasRightFrontLight: z.boolean(),
    hasLeftFrontLight: z.boolean(),
    hasRightBackLight: z.boolean(),
    hasLeftBackLight: z.boolean(),
    date: z.string().min(1, "La fecha es requerida"),
    status: z.enum(["active", "inactive"]).default("active"),
});

export type InspeccionSchemaForm = z.infer<typeof inspeccionSchema>;