import argon2 from "argon2";

const hashPassword = async (password: string) => await argon2.hash(password);

const verifyPassword = async (password: string, hash: string) =>
  await argon2.verify(hash, password);

export { hashPassword, verifyPassword };
