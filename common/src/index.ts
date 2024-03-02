import { z } from "zod"

export const signupValidation = z.object({
    username: z.string().min(1).max(15),
    password: z.string().min(3).max(10).refine((password)=>{
      return /[a-zA-Z]/.test(password) && /\d/.test(password)
    },{
      message:"Password must have atleast one letter and a number"
    })
  })

export const courseValidation = z.object({
    title: z.string().min(1).max(10),
    description: z.string().min(5).max(30),
    price: z.string().min(1),
    imageLink: z.string().min(1),
    published: z.boolean()
  })
  
export type signupParams = z.infer<typeof signupValidation>
export type courseParams = z.infer<typeof courseValidation>