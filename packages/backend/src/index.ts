import { Elysia, t, Context } from "elysia";
import cors from "@elysiajs/cors";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { usersTable } from "./db/schema";
import { auth } from "../auth"; 

export const db = drizzle(process.env.DB_FILE_NAME!);

const app = new Elysia()
  .mount(auth.handler)
  .use(cors())
  .get("/", () => "Hi Elysia")
  .post(
    "/user",
    async ({ body }) => {
      const newUser: typeof usersTable.$inferInsert = {
        name: body.name,
        age: body.age,
        email: body.email,
      };
      await db.insert(usersTable).values(newUser);
      return body;
    },
    {
      body: t.Object({
        name: t.String(),
        age: t.Number(),
        email: t.String(),
      }),
    },
  )
  .listen(3000)

export type App = typeof app;
