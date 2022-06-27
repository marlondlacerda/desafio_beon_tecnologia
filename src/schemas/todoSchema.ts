import { z } from 'zod';

const DATE_MSG = 'execution_date deve ser uma data exemplo:'
  + '"YY/MM/DD" ou "2020-01-01T00:00:00.000Z"';

export const todoSchema = z.object({
  name: z.string({
    required_error: '"name" é obrigatório',
    invalid_type_error: '"name" deve ser uma string',
  }),
  execution_date: z.preprocess((arg) => {
    /* istanbul ignore next */
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({
    required_error: DATE_MSG,
    invalid_type_error: DATE_MSG,
  })),
  situation: z.enum(['Pendente', 'Concluída'], {
    required_error: '"situation" é obrigatória',
    invalid_type_error: '"situation" deve ser "Pendente" ou "Concluída"',
  }),
  priority: z.enum(['Baixa', 'Média', 'Alta'], {
    required_error: '"priority" é obrigatória',
    invalid_type_error: '"priority" deve ser "Baixa", "Média" ou "Alta"',
  }),
  conclusion_date: z.preprocess((arg) => {
    /* istanbul ignore next */
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({
    required_error: DATE_MSG,
    invalid_type_error: DATE_MSG,
  })),
});

export type Todo = z.infer<typeof todoSchema>;

export const todoObjectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Id must have 24 hexadecimal characters',
  }),
});

export type TodoObjectId = z.infer<typeof todoObjectIdSchema>;
