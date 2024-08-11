import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
    Bindings : {
        DATABASE_URL : string ,
        JWT_SECRET : string
    }
}>() ;


userRoute.post('/signup' , async(c) => {
    const body =await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const user = await prisma.user.findUnique({
    where :{
      useremail : body.useremail
    }
  })

  if(user) {
    return c.json({
        code : 400 , 
        mssg : 'Already exist',
        data : {}
    })
  }

  const createUser= await prisma.user.create({
    data : {
      useremail : body.useremail ,
      username : body.username, 
      userpassword : body.userpassword
    }
  })

  const token = await sign({
    id : createUser.id ,
    email : createUser.useremail
  } , c.env.JWT_SECRET)

  return  c.json({
    code : 200, 
    mssg : 'Signed Up',
    data : {
        createUser , 
        token
    }
})
})

userRoute.post('/signin' , async(c) => {
    const body =await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const user = await prisma.user.findUnique({
    where :{
      useremail : body.useremail
    }
  })

  if(!user) {
    return c.json({
        code : 400 , 
        mssg : 'User does not exist',
        data : {}
    })
  }

  if(user.userpassword !== body.userpassword){
    return c.json({
      code : 400 , 
      mssg : 'Invalid Credentials',
      data : {}
  })
  }

  const token = await sign({
    id : user.id ,
    email : user.useremail
  } , c.env.JWT_SECRET)

  return  c.json({
    code : 200, 
    mssg : 'Signed in',
    data : {
        user , 
        token
    }
})
})