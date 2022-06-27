export default interface Model<T> {
  create(data: T): Promise<object>,
  read(): Promise<T[]>,
  readOne(id: string): Promise<object | null>,
  update(id: string, data: T): Promise<object | null>,
}
