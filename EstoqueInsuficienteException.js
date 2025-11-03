// EstoqueInsuficienteException.js
export class EstoqueInsuficienteException extends Error {
  constructor(message) {
    super(message);
    this.name = "EstoqueInsuficienteException";
  }
}