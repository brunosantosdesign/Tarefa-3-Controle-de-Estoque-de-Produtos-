// EstoqueProduto.js
import { EstoqueInsuficienteException } from './EstoqueInsuficienteException.js';

export class EstoqueProduto {
  #nomeProduto;
  #quantidade;

  /**
   * Requisito [cite: 69, 70]
   */
  constructor(nomeProduto, quantidadeInicial) {
    if (quantidadeInicial < 0) {
      throw new IllegalArgumentException("Quantidade inicial não pode ser negativa.");
    }
    this.#nomeProduto = nomeProduto;
    this.#quantidade = quantidadeInicial;
  }

  /**
   * Requisito [cite: 77, 78]
   */
  getQuantidadeAtual() {
    return this.#quantidade;
  }

  /**
   * Requisito [cite: 72]
   */
  adicionar(quantidade) {
    if (quantidade <= 0) {
      throw new IllegalArgumentException("Quantidade a adicionar deve ser maior que zero.");
    }
    this.#quantidade += quantidade;
  }

  /**
   * Requisito [cite: 74, 75]
   */
  remover(quantidade) {
    if (quantidade <= 0) {
      throw new IllegalArgumentException("Quantidade a remover deve ser maior que zero.");
    }
    if ((this.#quantidade - quantidade) < 0) {
      throw new EstoqueInsuficienteException("Estoque insuficiente para remoção.");
    }
    this.#quantidade -= quantidade;
  }
}

/**
 * Nota: O JavaScript não possui 'IllegalArgumentException' nativo como o Java.
 * Vamos usar 'Error' ou criar uma classe similar se necessário.
 * Para este exercício, vamos criar uma classe simples para ele também.
 */
export class IllegalArgumentException extends Error {
  constructor(message) {
    super(message);
    this.name = "IllegalArgumentException";
  }
}