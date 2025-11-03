// EstoqueProduto.test.js
import { test } from 'poku';
import * as assert from 'node:assert';
import { EstoqueProduto, IllegalArgumentException } from './EstoqueProduto.js';
import { EstoqueInsuficienteException } from './EstoqueInsuficienteException.js';

// Foi pedido para seguir o padrão Arrange-Act-Assert [cite: 26]
// Vamos aplicar essa lógica.

test('1. deve criar produto com estoque inicial válido', () => {
  // Arrange
  const nome = "Caneta";
  const inicial = 10;
  
  // Act
  const produto = new EstoqueProduto(nome, inicial);

  // Assert
  assert.strictEqual(produto.getQuantidadeAtual(), 10);
});

test('2. não deve criar produto com estoque inicial negativo', () => {
  // Arrange
  const nome = "Lapis";
  const inicialNegativa = -5;

  // Act & Assert
  // Requisito [cite: 81]
  assert.throws(() => {
    new EstoqueProduto(nome, inicialNegativa);
  }, IllegalArgumentException, "Quantidade inicial não pode ser negativa.");
});

test('3. deve adicionar itens ao estoque com sucesso', () => {
  // Arrange
  const produto = new EstoqueProduto("Borracha", 10);
  
  // Act
  produto.adicionar(5); // Requisito [cite: 82]

  // Assert
  assert.strictEqual(produto.getQuantidadeAtual(), 15);
});

test('4. não deve adicionar quantidade zero ao estoque', () => {
  // Arrange
  const produto = new EstoqueProduto("Caderno", 20);

  // Act & Assert
  // Requisito [cite: 83]
  assert.throws(() => {
    produto.adicionar(0);
  }, IllegalArgumentException, "Quantidade a adicionar deve ser maior que zero.");
  assert.strictEqual(produto.getQuantidadeAtual(), 20); // Garante que não mudou
});

test('5. não deve adicionar quantidade negativa ao estoque', () => {
  // Arrange
  const produto = new EstoqueProduto("Caderno", 20);

  // Act & Assert
  // Requisito [cite: 83]
  assert.throws(() => {
    produto.adicionar(-5);
  }, IllegalArgumentException, "Quantidade a adicionar deve ser maior que zero.");
  assert.strictEqual(produto.getQuantidadeAtual(), 20);
});

test('6. deve remover itens do estoque com sucesso', () => {
  // Arrange
  const produto = new EstoqueProduto("Mochila", 5);
  
  // Act
  produto.remover(2); // Requisito [cite: 82]

  // Assert
  assert.strictEqual(produto.getQuantidadeAtual(), 3);
});

test('7. não deve remover quantidade zero do estoque', () => {
  // Arrange
  const produto = new EstoqueProduto("Estojo", 8);

  // Act & Assert
  // Requisito [cite: 83]
  assert.throws(() => {
    produto.remover(0);
  }, IllegalArgumentException, "Quantidade a remover deve ser maior que zero.");
  assert.strictEqual(produto.getQuantidadeAtual(), 8);
});

test('8. não deve remover quantidade negativa do estoque', () => {
  // Arrange
  const produto = new EstoqueProduto("Estojo", 8);

  // Act & Assert
  // Requisito [cite: 83]
  assert.throws(() => {
    produto.remover(-3);
  }, IllegalArgumentException, "Quantidade a remover deve ser maior que zero.");
  assert.strictEqual(produto.getQuantidadeAtual(), 8);
});

test('9. não deve remover mais itens do que o disponível', () => {
  // Arrange
  const produto = new EstoqueProduto("Régua", 10);

  // Act & Assert
  // Requisito [cite: 85, 86]
  assert.throws(() => {
    produto.remover(11); // Tenta remover 11 de 10
  }, EstoqueInsuficienteException, "Estoque insuficiente para remoção.");
  assert.strictEqual(produto.getQuantidadeAtual(), 10); // Garante que o estoque não foi alterado
});