function criaCartao(id, imagem, nome, valor) {
    let cards = document.querySelector('.cards');
    let cardDiv = document.createElement('div');
    let cardImageDiv = document.createElement('div');
    let imageElement = document.createElement('img');
    let cardBodyDiv = document.createElement('div');
    let cardTitleHeading = document.createElement('h5');
    let priceParagraph = document.createElement('p');
    let formGroupDiv = document.createElement('div');
    let qtdField = document.createElement('input');
    let btnBuy = document.createElement('a');

    cardDiv.classList.add('card');

    cardImageDiv.classList.add('card-image');

    imageElement.src = imagem;

    cardBodyDiv.classList.add('card-body');

    cardTitleHeading.classList.add('card-title');
    cardTitleHeading.textContent = nome;

    priceParagraph.classList.add('preco');
    priceParagraph.textContent = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    formGroupDiv.classList.add('form-group');

    qtdField.type = 'number';
    qtdField.classList.add('form-control');
    qtdField.placeholder = 'Quantidade';

    btnBuy.classList.add('btn', 'btn-primary', 'btn-block');
    btnBuy.setAttribute('data-id', id);
    btnBuy.href = '#';
    btnBuy.textContent = 'Adicionar no Carrinho';

    cardImageDiv.appendChild(imageElement);
    cardBodyDiv.appendChild(cardTitleHeading);
    cardBodyDiv.appendChild(priceParagraph);
    formGroupDiv.appendChild(qtdField);
    cardBodyDiv.appendChild(formGroupDiv);
    cardBodyDiv.appendChild(btnBuy);

    cardDiv.appendChild(cardImageDiv);
    cardDiv.appendChild(cardBodyDiv);

    cards.appendChild(cardDiv);
}

function listaEstoque() {
    let estoque = mercadoArbyte.estoqueProdutos;

    estoque.forEach(produto => {
        let id = produto.id;
        let imagem = produto.imageURL;
        let nome = produto.name;
        let valor = produto.value;

        criaCartao(id, imagem, nome, valor);
    })
}

function inicializaBotoes() {
    let botoes = document.querySelectorAll('.card .btn');

    botoes.forEach(botao => {
        botao.addEventListener('click', comprar);
    })
}

function criaLinha(id, imagem, nome, valor, qtd) {
    for (let i = 0; i < qtd; ++i) {
        let row = document.createElement('div');
        let colQtd = document.createElement('div');
        let colImage = document.createElement('div');
        let image = document.createElement('img');
        let colProduct = document.createElement('div');
        let colValue = document.createElement('div');
        let carrinho = document.querySelector('.carrinho');

        row.classList.add('row');

        colQtd.textContent = carrinho.querySelectorAll('.row') ? carrinho.querySelectorAll('.row').length + 1 : 1;
        colQtd.classList.add('col');

        image.src = imagem;
        image.classList.add('product-image')

        colImage.classList.add('col');
        colImage.appendChild(image);

        colProduct.classList.add('col');
        colProduct.textContent = nome;

        colValue.classList.add('col');
        colValue.textContent = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        row.appendChild(colQtd);
        row.appendChild(colImage);
        row.appendChild(colProduct);
        row.appendChild(colValue);

        carrinho.append(row);
    }

}

function adicionarNoCarrinho(produto, qtd) {
    let {id, name, value, imageURL} = produto;
    let totalDom = document.querySelector('.total');
    
    qtd = qtd ? parseInt(qtd) : 1;
    
    carrinhoUsuario.adicionarNoCarrinho(produto, qtd);


    criaLinha(id, imageURL, name, value, qtd);
    totalDom.textContent = carrinhoUsuario.carrinhoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
}

function comprar(e) {
    e.preventDefault();
    let id = parseInt(this.getAttribute('data-id'));
    let qtd = this.previousElementSibling.querySelector('input').value;
    
    let produto = mercadoArbyte.buscaProduto(id);



    adicionarNoCarrinho(produto, qtd);
}

// Dados do dono e do mercado
let donoDoMercado = new Pessoa('Rafael Magalhães', 30, 450000);
let mercadoArbyte = new Mercado('Mercado Arbyte', donoDoMercado);

// Produtos
let maca = new Produto('Maçã Gala', 0.25, './img/apple.png');
let uva = new Produto('Uva', 2.50, './img/grape.png');
let abacaxi = new Produto('Abacaxi', 4, './img/pineapple.png');
let pera = new Produto('Pêra', 0.25, './img/pear.png');
let morango = new Produto('Morango', 4.50, './img/strawberry.png');

// Adiciona produtos no estoque do mercado
mercadoArbyte.adicionaEstoque(maca);
mercadoArbyte.adicionaEstoque(uva);
mercadoArbyte.adicionaEstoque(abacaxi);
mercadoArbyte.adicionaEstoque(pera);
mercadoArbyte.adicionaEstoque(morango);

// Cliente do Mercado
let novoUsuario = new Pessoa('Roberto Camargo', 24, 200);

// Cria carrinho
let carrinhoUsuario = new Carrinho(novoUsuario, mercadoArbyte);

listaEstoque();
inicializaBotoes();


// mercadoArbyte.listaProdutosEstoque();

// // Compra produtos
// carrinhoUsuario.adicionarNoCarrinho(maca);
// carrinhoUsuario.adicionarNoCarrinho(uva, 2);
// carrinhoUsuario.adicionarNoCarrinho(morango);

// carrinhoUsuario.carrinho;

// carrinhoUsuario.adicionarNoCarrinho(pera);
// carrinhoUsuario.adicionarNoCarrinho(abacaxi);

// carrinhoUsuario.carrinho;