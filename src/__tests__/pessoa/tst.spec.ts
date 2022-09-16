import { Pessoa } from "@modelTypes/pessoa";

it("Teste1", () => {
  const pessoa: Pessoa = {
    codigo: 1,
    admin: 1,
    email: "teste@teste.com",
    nome: "Teste",
    senha: "123",
    telefone: "99912345678",
  };

  expect(pessoa.email).toEqual("teste@teste.com");
});
