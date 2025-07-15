import { getUserByEmail } from "../api/userApi";
import { authenticateUser, generateAccessToken } from "../services/authService";
import jwt from "jsonwebtoken";

export const resolvers = {
  Mutation: {
    login: async (_: any, { email, password }: any, { res }: any) => {
      const result = await authenticateUser(email, password);
      if (!result) {
        throw new Error("Invalid credentials");
      }

      const { user, accessToken, refreshToken } = result;

      // Устанавливаем refreshToken в HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      });

      // Возвращаем accessToken и данные пользователя
      return {
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          secondName: user.secondName,
          roleId: user.roleId,
        },
      };
    },

    refreshToken: async (_: any, __: any, { req }: any) => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      try {
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET || "your-secret-key") as { email: string };

        const user = await getUserByEmail(payload.email);
        if (!user) {
          throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(user);

        return newAccessToken;
      } catch (err) {
        throw new Error("Invalid refresh token");
      }
    },
  },
};
