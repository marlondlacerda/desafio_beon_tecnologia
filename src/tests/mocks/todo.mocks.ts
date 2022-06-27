export const findOne = {
  "_id": "5dff58da85eb210f0aac43af",
  "name": "Tarefa 1",
  "execution_date": "2022/06/01",
  "situation": "Pendente",
  "priority": "Alta",
  "conclusion_date": "2020/06/05",
};

export const find = [
  {
    "_id": "5dff58da85eb210f0aac43af",
    "name": "Tarefa 1",
    "execution_date": "2022/06/01",
    "situation": "Pendente",
    "priority": "Alta",
    "conclusion_date": "2020/06/05",
  },
  {
    "_id": "5e0188f53877986a548aa6f4",
    "name": "Tarefa 2",
    "execution_date": "2022/06/08",
    "situation": "Concluída",
    "priority": "Baixa",
    "conclusion_date": "2020/06/10",
  }
];

export const create = {
  "name": "Tarefa 3",
  "execution_date": "2022-06-01T03:00:00.000Z",
  "situation": "Pendente",
  "priority": "Alta",
  "conclusion_date": "2022-06-05T03:00:00.000Z",
};

export const castError = new Error('Cast to number failed for value "NaN" at path "id" for model "Books"');

export const resultCreateError = { 
  "error":'Cast to number failed for value "NaN" at path "id" for model "Books"'
};

export const resultInvalidCreate1 = {
  "error": "\"name\" é obrigatório"
};

export const resultInvalidCreate2 = {
  "error": "Data inválida ou não informada, exemplos de data válidas:\"YY/MM/DD\" ou \"2020-01-01T00:00:00.000Z\""
};

export const resultInvalidCreate3 = {
  "error": "Invalid enum value. Expected 'Pendente' | 'Concluída', received 'Cancelado'"
};

export const findError = new Error('test find error');

export const resultFindError = {
  "error": "Internal Server Error"
};

export const resultFindOneError404 = {
  "error": "The data was not found!"
}

export const update = {
  "name": "Tarefa 3",
  "execution_date": "2022/06/01",
  "situation": "Concluída",
  "priority": "Alta",
  "conclusion_date": "2020/06/05",
};
