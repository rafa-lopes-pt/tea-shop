import { WithId } from "mongodb";
import { UserSchemaType } from "../../../../shared/schemas/user.schema";

export type DbUserSchemaType = WithId<UserSchemaType> & { password: string };
