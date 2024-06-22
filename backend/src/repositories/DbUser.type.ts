import { UserSchemaType } from "../../../shared/schemas/user.schema";

export type DbUserSchemaType = UserSchemaType & { password: string };
