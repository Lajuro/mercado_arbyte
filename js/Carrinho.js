class Carrinho {
    constructor(owner, market) {
        this.owner = owner;
        this.market = market;
        this.itemsComprados = [];
    }

    adicionarNoCarrinho(produto, qtd) {
        const quantidade = !qtd || qtd < 1 ? 1 : qtd;
        this.itemsComprados.push({ produto, quantidade });
    }

    get carrinho() {
        let carrinho = this.itemsComprados;
        if (carrinho.length === 0) {
            console.warn('### Não foram adicionados produtos no carrinho ainda. ###');
        } else {
            let total = 0;
            carrinho.forEach((item, index) => {
                const { produto, quantidade } = item;
                total += produto.value * quantidade;
                console.log(`## Item ${index + 1} ##`);
                console.log(`Produto: ${produto.name} - Qtd: ${quantidade}`);
                console.log(`Valor: ${(produto.value * quantidade).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
                if (index !== carrinho.length - 1) {
                    console.log('\n');
                }
            });

            if (carrinho.length > 1) {
                console.log(`\nForam comprados ${carrinho.length} produtos.`);
            } else {
                console.log(`\nFoi comprado 1 produto.`);
            }

            console.log(`Até agora, o carrinho tem um total de ${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`);
        }
    }

    get carrinhoTotal() {
        return this.itemsComprados.reduce((acc, item) => acc + item.produto.value * item.quantidade, 0);
    }
}

