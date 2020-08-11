class Carrinho {
    constructor(owner, market) {
        this.owner = owner;
        this.market = market;
        this.itemsComprados = [];
    }

    adicionarNoCarrinho(produto, qtd) {

        qtd = !qtd || qtd < 1 ? 1 : qtd;

        for (let i = 0; i < qtd; i++) {
            this.itemsComprados.push(produto);
        }
    }

    get carrinho() {
        let carrinho = this.itemsComprados;
        if (carrinho.length === 0) {
            console.warn('### Não foram adicionados produtos no carrinho ainda. ###');
        } else {
            let total = 0;
            carrinho.forEach((produto, index, arr) => {
                total += produto.value;
                console.log(`## Item ${index + 1} ##`);
                console.log(`Produto: ${produto.name}`);
                console.log(`Valor: ${produto.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`);
                if (index !== arr.length - 1) {
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
        return this.itemsComprados.map(item => item.value).reduce((acc, current) => acc + current);
    }
}