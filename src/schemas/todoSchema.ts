import { z } from 'zod';

export const todoSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome deve ser uma string',
  }),
  execution_date: z.preprocess((arg) => {
    /* istanbul ignore next */
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  situation: z.enum(['Pendente', 'Concluída'], {
    required_error: 'Situação é obrigatória',
    invalid_type_error: 'Situação deve ser "Pendente" ou "Concluída"',
  }),
  priority: z.enum(['Baixa', 'Média', 'Alta'], {
    required_error: 'Prioridade é obrigatória',
    invalid_type_error: 'Prioridade deve ser "Baixa", "Média" ou "Alta"',
  }),
  conclusion_date: z.preprocess((arg) => {
    /* istanbul ignore next */
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export type Todo = z.infer<typeof todoSchema>;

export const todoObjectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Id must have 24 hexadecimal characters',
  }),
});

export type TodoObjectId = z.infer<typeof todoObjectIdSchema>;
