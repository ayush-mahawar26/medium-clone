import { PrismaClient } from "@prisma/client/edge";
import { UNABLE_TO_FIND_POSTINSTALL_TRIGGER__ENVAR_MISSING } from "@prisma/client/scripts/postinstall.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>() ;

blogRoute.use(async( c, next ) => {

    const jwt = c.req.header('Authorization')

    if(!jwt){
        return c.json({
            code : 400 , 
            mssg : 'Missing token',
            data : {}
        })
    }

    const token  = jwt!.split(' ')[1] ;

    const payload = await verify(token , c.env.JWT_SECRET) ;
    if(!payload) {
        return  c.json({
            code : 400 , 
            mssg : 'Unauthorized',
            data : {}
        })
    }
    c.set('jwtPayload' , payload.id)
    await next()
})

blogRoute.post('/' , async (c) => {
    const body = await c.req.json(); 
    
    const userid = c.get('jwtPayload') 

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())


    const post = await prisma.blog.create({
        data : {
            userId : userid, 
            title : body.title ,
            description : body.description ,
            published : false
        }
    })

    if(!post) {
        return  c.json({
            code : 500 , 
            mssg : 'Server Error',
            data : {}
        })
    }

    return  c.json({
        code : 200 , 
        mssg : 'Blog created',
        data : {
            post
        }
    })
   
})

blogRoute.get('/' , async (c) => {
    console.log("abc");
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())


    const posts = await prisma.blog.findMany({
        select : {
            id : true ,
            title : true ,
            description : true ,
            published : true,
            User : {
                select : {
                    username : true ,
                    useremail : true
                }
            }
        }
    })

    if(!posts) {
        return  c.json({
            code : 500 , 
            mssg : 'Server Error',
            data : {}
        }) 
    }

    return  c.json({
        code : 200 , 
        mssg : 'Post Fetched',
        data : posts
    })
})


blogRoute.get('/:id' , async(c) => {
    const postid = c.req.param('id')

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post =await prisma.blog.findUnique({
        where : {
            id : postid,
        },
        select : {
            id: true,
            title: true ,
            published : true ,
            description : true,
            User : {
                select : {
                    username :true
                }
            }
        }
    })

    if(!post) {
        return  c.json({
            code : 400 , 
            mssg : 'No post exist',
            data : {}
        })
    }


    return  c.json({
        code : 200 , 
        mssg : 'PostFetched',
        data : {
            post
        }
    })
})


