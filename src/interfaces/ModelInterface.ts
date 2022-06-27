export default interface Model<T> {
  create(data: T): Promise<object>,
}
