import { z } from "zod";

export const reporteSchema = z.object({
    startDate: z.string().min(1, "La fecha inicial es requerida"),
    endDate: z.string().min(1, "La fecha final es requerida"),
    employeeId: z.number().optional(),
    customerId: z.number().optional(),
    vehicleId: z.number().optional(),
    type: z.enum(["renta", "inspeccion", "cliente", "vehiculo"]),
});

export type ReporteSchemaForm = z.infer<typeof reporteSchema>;