import { z } from "zod";

export const tipoVehiculoSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    status: z.string().nonempty({message: "El estado es obligatorio"}).default("active"),
});

export type TipoVehiculoSchemaForm = z.infer<typeof tipoVehiculoSchema>;