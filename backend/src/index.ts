import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { userRoute } from './routes/user.routes';
import { blogRoute } from './routes/blog.routes';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string 
  }
}>()

app.use('*', cors({
  origin : "*",
  allowMethods : [
    "GET", "POST" , "PUT"
  ]
}))
app.route('/api/v1/user' , userRoute)
app.route('/api/v1/blog', blogRoute)


export default app
