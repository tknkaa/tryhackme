import { Elysia, t } from "elysia"
import cors from "@elysiajs/cors"

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hi Elysia")
  .post("/name", ({ body }) => body, {
    body: t.Object({
      name: t.String({ minLength: 5 })
    })
  })
  .listen(3000)

export type App = typeof app
