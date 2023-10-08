interface IDatasControle {
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    dataExclusao?: Date | null;
}

type KeysDatasControle = keyof IDatasControle;

export { IDatasControle, KeysDatasControle }