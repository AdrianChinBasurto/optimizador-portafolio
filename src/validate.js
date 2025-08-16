import { z } from "zod";

export const ItemSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  peso: z.number().int().nonnegative("El peso debe ser un entero ≥ 0"),
  ganancia: z.number().int().nonnegative("La ganancia debe ser un entero ≥ 0")
});

export const BodySchema = z.object({
  capacidad: z.number().int().nonnegative("La capacidad debe ser un entero ≥ 0"),
  objetos: z.array(ItemSchema).min(1, "Debe incluir al menos un proyecto")
});
