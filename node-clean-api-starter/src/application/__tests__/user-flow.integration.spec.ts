import { InMemoryUserRepository } from "../../infrastructure/repositories/InMemoryUserRepository";
import { UuidGenerator } from "../../infrastructure/services/UuidGenerator";
import { IdGenerator } from "../gateways/IdGenerator";

import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { DeleteUserUseCase } from "../use-cases/delete-user/DeleteUserUseCase";
import { FindUserByEmailUseCase } from "../use-cases/find-user-by-email/FindUserByEmailUseCase";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id/GetUserByIdUseCase";

describe("User Flow – Integration Test", () => {
  let repository: InMemoryUserRepository;
  let idGenerator: IdGenerator;
  beforeEach(() => {
    repository = new InMemoryUserRepository();
    idGenerator = new UuidGenerator();
  });

  it("should create users, delete one, and retrieve users by id and email", async () => {
    const createUser = new CreateUserUseCase(repository, idGenerator);
    const deleteUser = new DeleteUserUseCase(repository);
    const getUserById = new GetUserByIdUseCase(repository);
    const findUserByEmail = new FindUserByEmailUseCase(repository);

    const users = [];

    const names = [
      "Usuário Um",
      "Usuário Dois",
      "Usuário Três",
      "Usuário Quatro",
      "Usuário Cinco",
      "Usuário Seis",
      "Usuário Sete",
      "Usuário Oito",
      "Usuário Nove",
      "Usuário Dez",
    ];

    // Arrange – Create users
    for (let i = 0; i < names.length; i++) {
      const user = await createUser.execute({
        name: names[i],
        email: `usuario${i + 1}@email.com`,
      });

      users.push(user);
    }

    expect(users).toHaveLength(10);

    // Act – Delete one user
    const deletedUser = users[6];
    await deleteUser.execute(deletedUser.id);

    // Assert – Find by ID
    const userById = await getUserById.execute(users[4].id);

    expect(userById).toBeDefined();
    expect(userById.name.getValue()).toBe("Usuário Cinco");
    expect(userById.email.getValue()).toBe("usuario5@email.com");

    // Assert – Find by Email
    const userByEmail = await findUserByEmail.execute("usuario3@email.com");

    expect(userByEmail).toBeDefined();
    expect(userByEmail.name.getValue()).toBe("Usuário Três");
    expect(userByEmail.email.getValue()).toBe("usuario3@email.com");
  });
});
