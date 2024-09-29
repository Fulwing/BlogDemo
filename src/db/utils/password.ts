import { genSalt, compare, hash } from "bcrypt-ts";

const SALT_ROUNDS = 12;

export async function saltAndHashPassword(password: string): Promise<string> {
  try {
    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Password verification failed');
  }
}