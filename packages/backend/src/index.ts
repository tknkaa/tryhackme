import { Elysia, t } from "elysia"
import cors from "@elysiajs/cors"

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hi Elysia")
  .get("/id/:id", ({ params: { id }}) => id)
  .post("/mirror", ({ body }) => body, {
    body: t.Object({
      id: t.Number(),
      name: t.String()
    })
  })
  .post("/name", ({ body }) => body, {
    body: t.Object({
      name: t.String({ minLength: 5 })
    })
  })
  .listen(3000)

export type App = typeof app
