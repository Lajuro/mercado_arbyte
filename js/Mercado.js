class Mercado {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.estoqueProdutos = [];
    }

    adicionaEstoque(produto) {
        try {
            if (produto.name && produto.value) {
                this.estoqueProdutos.push(produto);
            } else {
                throw 'Produto inválido';
            }

        } catch (error) {
            console.error(error);
        }
    }

    listaProdutosEstoque() {
        if (this.estoqueProdutos.length === 0) {
            console.warn('### Não tem produtos cadastrados no estoque. ###');
        } else {
            this.estoqueProdutos.forEach((produto, index, arr) => {
                console.log(`## Item ${index + 1} ##`);
                console.log(`Produto: ${produto.name}`);
                console.log(`Valor: ${produto.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`);
                if (index !== arr.length - 1) {
                    console.log('\n');
                }
            });
        }
    }

    buscaProduto(id) {
        let result = false;
        this.estoqueProdutos.forEach(produto => {
            if (produto.id === id) {
                result = produto;
            }
        });
        return result;
    }
}