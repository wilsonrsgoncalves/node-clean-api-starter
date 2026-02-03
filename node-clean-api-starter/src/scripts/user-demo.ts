import { CreateUserUseCase } from "../application/use-cases/create-user/CreateUserUseCase";
import { DeleteUserUseCase } from "../application/use-cases/delete-user/DeleteUserUseCase";
import { FindUserByEmailUseCase } from "../application/use-cases/find-user-by-email/FindUserByEmailUseCase";
import { GetUserByIdUseCase } from "../application/use-cases/get-user-by-id/GetUserByIdUseCase";
import { InMemoryUserRepository } from "../infrastructure/repositories/InMemoryUserRepository";
import { UuidGenerator } from "../infrastructure/services/UuidGenerator";

async function run() {
  const userRepository = new InMemoryUserRepository();
  const idGenerator = new UuidGenerator();

  const createUser = new CreateUserUseCase(userRepository, idGenerator);
  const deleteUser = new DeleteUserUseCase(userRepository);
  const findById = new GetUserByIdUseCase(userRepository);
  const findByEmail = new FindUserByEmailUseCase(userRepository);

  console.log("🚀 Criando usuários...\n");

  const users = [];

  for (let i = 1; i <= 10; i++) {
    const user = await createUser.execute({
      name: `Usuário ${i}`,
      email: `usuario${i}@email.com`,
    });

    users.push(user);
    console.log(`[CREATE] ${user.name} (${user.email})`);
  }

  console.log("\n🗑️ Removendo usuário 7...\n");
  await deleteUser.execute( users[6].id );
  console.log("[DELETE] Usuário 7 removido com sucesso");

  console.log("\n🔍 Buscando usuário por ID (Usuário 5)...\n");
  const userById = await findById.execute(users[4].id );
  console.log(userById);

  console.log("\n🔍 Buscando usuário por Email (usuario3@email.com)...\n");
  const userByEmail = await findByEmail.execute("usuario3@email.com");
  console.log(userByEmail);
}

run().catch((error) => {
  console.error("❌ Erro na execução:", error.message);
});
