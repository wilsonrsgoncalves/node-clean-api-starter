import { randomUUID } from "crypto";
import { IdGenerator } from "../../application/gateways/IdGenerator";

export class UuidGenerator implements IdGenerator {
    generate(): string {
        return randomUUID();
    }
}
