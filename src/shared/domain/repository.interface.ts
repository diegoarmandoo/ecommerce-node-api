interface IQuery<T> {
    recuperarPorUuid(uuid: string): Promise<T | null>;
    recuperarTodos(): Promise<Array<T>>;
    existe(uuid: string): Promise<boolean>;
}

interface ICommand<T> {
    inserir(entity: T): Promise<T>;
    atualizar(uuid: string, entity: Partial<T>): Promise<boolean>;
    deletar(uuid: string): Promise<boolean>;
}

interface IRepository<T> extends IQuery<T>, ICommand<T> {}; 

export { IRepository }