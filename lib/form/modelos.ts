import { z } from "zod";

export const modeloSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    brandId: z.number().min(1, "La marca es requerida"),
    status: z.enum(["active", "inactive"]).default("active"),
});

export type ModeloSchemaForm = z.infer<typeof modeloSchema>;