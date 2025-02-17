import { z } from "zod";

export const clienteSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    documentId: z.string().min(1, "El documento es requerido"),
    creditCard: z.string().min(1, "La tarjeta de crédito es requerida"),
    creditLimit: z.number().min(0, "El límite de crédito debe ser mayor a 0"),
    personType: z.enum(["fisica", "juridica"]),
    status: z.enum(["active", "inactive"]).default("active"),
});

export type ClienteSchemaForm = z.infer<typeof clienteSchema>;