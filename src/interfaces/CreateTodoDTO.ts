export interface CreateTodoDTO {
  name: string;
  date_execution: Date;
  situation: 'pending' | 'concluded';
  priority: 'low' | 'medium' | 'high';
  date_conclusion: Date;
}
