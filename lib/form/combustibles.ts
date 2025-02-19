import { z } from "zod";

export const combustibleSchema = z.object({
    id: z.number().optional(),
    description: z.string().min(1, "La descripción es requerida"),
    status: z.string().nonempty({
        message: "El estado es requerido",
    }).default("active"),
});

export type CombustibleSchemaForm = z.infer<typeof combustibleSchema>;