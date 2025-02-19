import { z } from "zod";

export const modeloSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    brandId: z.number().min(1, "La marca es requerida").int({
        message: "La marca es numérica",
    }).positive({ message: "La marca es numérica positiva" }),
    status: z.string().nonempty({
        message: "El estado es requerido",
    }).default("active"),
});

export type ModeloSchemaForm = z.infer<typeof modeloSchema>;