'use strict';

function criaCartao(produto) {
    const { id, imageURL, name, value } = produto;
    const cards = document.querySelector('.cards');
    const cardDiv = document.createElement('div');
    const cardImageDiv = document.createElement('div');
    const imageElement = document.createElement('img');
    const cardBodyDiv = document.createElement('div');
    const cardTitleHeading = document.createElement('h5');
    const priceParagraph = document.createElement('p');
    const formGroupDiv = document.createElement('div');
    const qtdField = document.createElement('input');
    const btnBuy = document.createElement('a');

    cardDiv.classList.add('card');
    cardImageDiv.classList.add('card-image');
    imageElement.src = imageURL;
    cardBodyDiv.classList.add('card-body');
    cardTitleHeading.classList.add('card-title');
    cardTitleHeading.textContent = name;
    priceParagraph.classList.add('preco');
    priceParagraph.textContent = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    formGroupDiv.classList.add('form-group');
    qtdField.type = 'number';
    qtdField.classList.add('form-control');
    qtdField.placeholder = 'Quantidade';
    btnBuy.classList.add('btn', 'btn-primary', 'btn-block');
    btnBuy.dataset.id = id;
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

function listaEstoque(market) {
    market.estoqueProdutos.forEach(produto => criaCartao(produto));
}

function inicializaBotoes() {
    document.querySelectorAll('.card .btn').forEach(botao => {
        botao.addEventListener('click', comprar);
    });
}

function criaLinha(produto, quantidade) {
    const row = document.createElement('div');
    const colQtd = document.createElement('div');
    const colImage = document.createElement('div');
    const image = document.createElement('img');
    const colProduct = document.createElement('div');
    const colValue = document.createElement('div');
    const carrinho = document.querySelector('.carrinho');

    row.classList.add('row');
    colQtd.textContent = quantidade;
    colQtd.classList.add('col');

    image.src = produto.imageURL;
    image.classList.add('product-image');
    colImage.classList.add('col');
    colImage.appendChild(image);

    colProduct.classList.add('col');
    colProduct.textContent = produto.name;

    colValue.classList.add('col');
    colValue.textContent = (produto.value * quantidade).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    row.appendChild(colQtd);
    row.appendChild(colImage);
    row.appendChild(colProduct);
    row.appendChild(colValue);
    carrinho.append(row);
}

function adicionarNoCarrinho(produto, qtd) {
    const quantidade = qtd ? parseInt(qtd, 10) : 1;
    carrinhoUsuario.adicionarNoCarrinho(produto, quantidade);
    criaLinha(produto, quantidade);
    document.querySelector('.total').textContent = carrinhoUsuario.carrinhoTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function comprar(e) {
    e.preventDefault();
    const id = parseInt(e.currentTarget.dataset.id, 10);
    const qtd = e.currentTarget.previousElementSibling.querySelector('input').value;
    const produto = mercadoArbyte.buscaProduto(id);
    adicionarNoCarrinho(produto, qtd);
}

function init() {
    const donoDoMercado = new Pessoa('Rafael Magalhães', 30, 450000);
    mercadoArbyte = new Mercado('Mercado Arbyte', donoDoMercado);

    const produtos = [
        new Produto('Maçã Gala', 0.25, './img/apple.png'),
        new Produto('Uva', 2.50, './img/grape.png'),
        new Produto('Abacaxi', 4, './img/pineapple.png'),
        new Produto('Pêra', 0.25, './img/pear.png'),
        new Produto('Morango', 4.50, './img/strawberry.png')
    ];

    produtos.forEach(p => mercadoArbyte.adicionaEstoque(p));

    const novoUsuario = new Pessoa('Roberto Camargo', 24, 200);
    carrinhoUsuario = new Carrinho(novoUsuario, mercadoArbyte);

    listaEstoque(mercadoArbyte);
    inicializaBotoes();
}

let mercadoArbyte;
let carrinhoUsuario;

document.addEventListener('DOMContentLoaded', init);

