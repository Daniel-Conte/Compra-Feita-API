class Pessoa {
  private readonly _codigo?: number;
  private _nome: string;
  private _email: string;
  private _senha: string;
  private _telefone: string;
  private _admin: number;

  constructor(props: IPessoa) {
    this._codigo = props.codigo;
    this._nome = props.nome;
    this._email = props.email;
    this._senha = props.senha;
    this._telefone = props.telefone;
    this._admin = props.admin;
  }

  get codigo(): number | undefined {
    return this._codigo;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get senha(): string {
    return this._senha;
  }

  set senha(senha: string) {
    this._senha = senha;
  }

  get telefone(): string {
    return this._telefone;
  }

  set telefone(telefone: string) {
    this._telefone = telefone;
  }

  get admin(): number {
    return this._admin;
  }

  set admin(admin: number) {
    this._admin = admin;
  }
}

interface IPessoa {
  codigo?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  admin: number;
}

export default Pessoa;
