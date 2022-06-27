export interface Model<T> {
  create(data: T): Promise<object>,
}
