import { CreateUserUseCase } from '../../application/use-cases/create-user/CreateUserUseCase';
import { CreateUserController } from '../../interfaces/http/controllers/CreateUserController';
import { UuidGenerator } from '../../infrastructure/services/UuidGenerator';
import { InMemoryUserRepository } from '../../infrastructure/repositories/InMemoryUserRepository';

export function makeCreateUserControllerFactory(): CreateUserController {
  const userRepository = new InMemoryUserRepository();
  const idGenerator = new UuidGenerator();
  
  const createUserUseCase = new CreateUserUseCase(userRepository, idGenerator);
  
  return new CreateUserController(createUserUseCase);
}
