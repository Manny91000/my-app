import { z } from "zod";

export const alquilerSchema = z.object({
    employeeId: z.string().min(1, "Empleado es requerido"),
    customerId: z.string().min(1, "Cliente es requerido"),
    vehicleId: z.string().min(1, "Vehículo es requerido"),
    rentDate: z.string().min(1, "Fecha de renta es requerida"),
    returnDate: z.string().min(1, "Fecha de retorno es requerida"),
    comments: z.string().optional(),
    status: z.string(),
    dailyRate: z.number().min(0, "La tarifa diaria debe ser mayor a 0"),
});

export type AlquilerSchemaForm = z.infer<typeof alquilerSchema>;