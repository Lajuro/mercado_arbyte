class Pessoa {
    constructor(name, idade, saldoNoCartao) {
        this.name = name;
        this.idade = idade;
        this._saldoNoCartao = saldoNoCartao;
    }

    get saldo() {
        return this._saldoNoCartao;
    }
}

