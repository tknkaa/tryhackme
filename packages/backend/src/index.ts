import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import "dotenv/config";
import { todo } from "./db/schema";
import { auth } from "../auth";
import { db } from "./db";
import { eq } from "drizzle-orm";

const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

const app = new Elysia()
  .use(betterAuth)
  .use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
  .get("/", () => "Hi Elysia")
  .post(
    "/todo",
    async ({ body, user }) => {
      const newTodo: typeof todo.$inferInsert = {
        description: body.description,
        userId: user.id,
      };
      await db.insert(todo).values(newTodo);
      return body;
    },
    {
      auth: true,
      body: t.Object({
        description: t.String(),
      }),
    },
  )
  .get(
    "/todo",
    async ({ user }) => {
      const todos = await db
        .select()
        .from(todo)
        .where(eq(todo.userId, user.id));
      return todos;
    },
    {
      auth: true,
    },
  )
  .listen(3000);

export type App = typeof app;
