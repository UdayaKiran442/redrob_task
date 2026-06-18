import { Hono } from 'hono'
import apiRouter from './routes'
import { upsertCandidatesToEmbeddingsScript } from './scripts/candidate.script'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', apiRouter);

app.get("/test", async (c) => {
  const file = await upsertCandidatesToEmbeddingsScript();
  return c.json({ file });
})

export default app
