import Pessoa from "../../models/Pessoa";

export interface ICreatePessoaDTO extends Omit<Pessoa, "codigo"> {}
