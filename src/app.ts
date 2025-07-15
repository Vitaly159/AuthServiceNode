// @ts-nocheck
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/schema"; // ваш schema
import { resolvers } from "./resolvers/resolvers"; // ваши резолверы
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export async function App() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // Передача контекста через expressMiddleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req, res }) => ({ req, res }),
    })
  );

  return app;
}
