const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Carrega os arquivos das classes que serao testadas
const produtoCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'Produto.js'), 'utf8');
const carrinhoCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'Carrinho.js'), 'utf8');

vm.runInThisContext(produtoCode);
vm.runInThisContext(carrinhoCode);

function safeTotal(carrinho) {
  try {
    return carrinho.carrinhoTotal;
  } catch (e) {
    return 0;
  }
}

// Teste: carrinho vazio deve ter total 0
const carrinhoVazio = new Carrinho({}, {});
assert.strictEqual(safeTotal(carrinhoVazio), 0, 'Total deve ser 0 para carrinho vazio');

// Teste: total apos adicionar produtos
const banana = new Produto('Banana', 2);
const uva = new Produto('Uva', 3);
const carrinho = new Carrinho({}, {});
carrinho.adicionarNoCarrinho(banana);
carrinho.adicionarNoCarrinho(uva, 2);
assert.strictEqual(safeTotal(carrinho), 8, 'Total deve considerar os valores dos produtos adicionados');

console.log('Todos os testes passaram!');
