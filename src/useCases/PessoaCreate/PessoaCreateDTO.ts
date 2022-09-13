import Pessoa from "../../entities/Pessoa";

export default interface IPessoaCreateDTO extends Omit<Pessoa, "codigo"> {}
