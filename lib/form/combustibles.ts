import { z } from "zod";

export const combustibleSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    status: z.enum(["active", "inactive"]).default("active"),
});

export type CombustibleSchemaForm = z.infer<typeof combustibleSchema>;