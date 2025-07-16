import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, UserModel } from "../models/userModel";
import { getUserByEmail } from "../api/userApi";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // короткий срок
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // долгий срок

// Генерация access токена
export function generateAccessToken(user: IUser): string {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

// Генерация refresh токена
export function generateRefreshToken(user: IUser): string {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

// Проверка токена и получение userId
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return { userId: decoded.userId };
  } catch (err) {
    return null;
  }
}

// Валидация пароля
export async function validatePassword(user: IUser, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

// Основная функция авторизации
export async function authenticateUser(
  email: string,
  password: string
): Promise<{
  user: IUser;
  accessToken: string;
  refreshToken: string;
} | null> {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid user");
  }

  if (!user.isActive) {
    throw new Error("Invalid user"); // пользователь неактивен
  }

  const isPasswordValid = await validatePassword(user, password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");; // неправильный пароль
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken,
  };
}
