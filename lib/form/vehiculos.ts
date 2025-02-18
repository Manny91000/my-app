import { z } from "zod";

export const vehiculoSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    chassisNumber: z.string().min(1, "El número de chasis es requerido"),
    engineNumber: z.string().min(1, "El número de motor es requerido"),
    plateNumber: z.string().min(1, "El número de placa es requerido"),
    vehicleTypeId: z.number().min(1, "El tipo de vehículo es requerido"),
    brandId: z.number().min(1, "La marca es requerida"),
    modelId: z.number().min(1, "El modelo es requerido"),
    fuelTypeId: z.number().min(1, "El tipo de combustible es requerido"),
    status: z.enum(["active", "inactive", "rented", "maintenance"]).default("active"),
});

export type VehiculoSchemaForm = z.infer<typeof vehiculoSchema>;