import { User } from "../../types/user.type.js";

export function createUser(userData: string): User {
  const [
    name,
    email,
  ] = userData.replace('\n', '').split('\t');

  return {
    name,
    email,
  } as User;
}
