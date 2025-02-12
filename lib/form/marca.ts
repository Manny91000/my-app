"use client"

import { z } from "zod"

export const marcaSchema = z.object({
  id: z.string().optional(),
  description: z.string().nonempty({message: 'la descripcion es esencial'}),
  status: z.string().nonempty({message: 'el estado es esencial'}),

})

export type MarcaSchemaForm = z.infer<typeof marcaSchema> 