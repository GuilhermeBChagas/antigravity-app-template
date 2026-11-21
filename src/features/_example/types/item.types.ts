import { z } from 'zod';

export const exampleItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Informe ao menos 2 caracteres')
    .max(120, 'Máximo de 120 caracteres'),
  description: z.string().trim().max(500, 'Máximo de 500 caracteres').optional().default(''),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
});

export type ExampleItemInput = z.infer<typeof exampleItemSchema>;

export interface ExampleItem {
  id: string;
  title: string;
  description: string | null;
  status: 'active' | 'inactive' | 'pending' | string;
  created_at: string;
  updated_at: string;
}
