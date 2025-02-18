import { z } from "zod";

export const empleadoSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    documentId: z.string().min(1, "El documento es requerido"),
    workShift: z.string().min(1, "El horario es requerido"),
    commissionPct: z.number().min(0, "La comisión debe ser mayor o igual a 0"),
    hireDate: z.string().min(1, "La fecha de contrato es requerida"),
    status: z.enum(["active", "inactive"]).default("active"),
    roleId: z.number().min(1, "El rol es requerido"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type EmpleadoSchemaForm = z.infer<typeof empleadoSchema>;