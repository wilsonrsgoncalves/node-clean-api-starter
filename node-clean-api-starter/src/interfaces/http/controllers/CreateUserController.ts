import { NextFunction, Request, Response } from "express";
import type { CreateUserDTO } from "../../../application/use-cases/create-user/CreateUserDTO";
import { CreateUserUseCase } from "../../../application/use-cases/create-user/CreateUserUseCase";
import type { UserResponseDTO } from "../dtos/UserResponseDTO";

export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) { }

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { name, email } = req.body as CreateUserDTO;
      const user = await this.useCase.execute({ name, email });
      
      const userResponse: UserResponseDTO = {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      };

      return res.status(201).json(userResponse);
    } catch (error) {
      next(error);
    }
  }
}
