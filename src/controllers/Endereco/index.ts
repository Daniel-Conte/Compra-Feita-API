import EnderecoRepositoryPostgresSQL from "@repositories/EnderecoRepository/EnderecoRepositoryPostgresSQL";
import CreateEnderecoController from "./CreateEnderecoController";
import DeleteEnderecoController from "./DeleteEnderecoController";
import GetEnderecoController from "./GetEnderecoController";
import ListEnderecoController from "./ListEnderecoController";
import UpdateEnderecoController from "./UpdateEnderecoController";

const enderecoRepositoryPostgresSQL = new EnderecoRepositoryPostgresSQL();

export const createEnderecoController = new CreateEnderecoController(
  enderecoRepositoryPostgresSQL
);
export const listEnderecoController = new ListEnderecoController(
  enderecoRepositoryPostgresSQL
);
export const updateEnderecoController = new UpdateEnderecoController(
  enderecoRepositoryPostgresSQL
);
export const getEnderecoController = new GetEnderecoController(
  enderecoRepositoryPostgresSQL
);
export const deleteEnderecoController = new DeleteEnderecoController(
  enderecoRepositoryPostgresSQL
);
