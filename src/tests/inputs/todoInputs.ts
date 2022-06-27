export const todoValidCreate = {
  name: 'Tarefa 3',
  execution_date: '2022/06/01',
  situation: 'Pendente',
  priority: 'Alta',
  conclusion_date: '2022/06/05',
};

export const todoInvalidCreate1 = {
  execution_date: '2022/06/01',
  situation: 'Pendente',
  priority: 'Alta',
  conclusion_date: '2020/06/05',
};

export const todoInvalidCreate2 = {
  name: 'Tarefa 3',
  execution_date: "2020-01-01T00:00:00.000Z",
  situation: 'Pendente',
  priority: 'Alta',
  conclusion_date: '13/12/1992',
};

export const todoInvalidCreate3 = {
  name: 'Tarefa 3',
  execution_date: '2022/06/01',
  situation: 'Cancelado',
  priority: 'Alta',
  conclusion_date: '2022/06/05',
};

export const todoValidUpdate = {
  _id: '5dff58da85eb210f0aac43af',
  name: 'Tarefa 3',
  execution_date: '2022/06/01',
  situation: 'Concluída',
  priority: 'Alta',
  conclusion_date: '2020/06/05',
};
