import Pessoa from "@models/Pessoa";

it("Teste1", () => {
  const pessoa = new Pessoa({
    admin: 1,
    email: "teste@teste.com",
    nome: "Teste",
    senha: "123",
    telefone: "99912345678",
  });

  expect(pessoa.email).toEqual("teste@teste.com");
});
