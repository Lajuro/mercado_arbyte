class Mercado {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.estoqueProdutos = [];
    }

    adicionaEstoque(produto) {
        if (!(produto instanceof Produto)) {
            throw new Error('Produto inválido');
        }

        this.estoqueProdutos.push(produto);
    }

    listaProdutosEstoque() {
        if (this.estoqueProdutos.length === 0) {
            console.warn('### Não tem produtos cadastrados no estoque. ###');
            return;
        }

        this.estoqueProdutos.forEach((produto, index) => {
            console.log(`## Item ${index + 1} ##`);
            console.log(`Produto: ${produto.name}`);
            console.log(`Valor: ${produto.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
            if (index !== this.estoqueProdutos.length - 1) {
                console.log('\n');
            }
        });
    }

    buscaProduto(id) {
        return this.estoqueProdutos.find(produto => produto.id === id) || null;
    }

}
