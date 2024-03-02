import { z } from "zod";
export declare const signupValidation: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const courseValidation: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodString;
    imageLink: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: string;
    imageLink: string;
    published: boolean;
}, {
    title: string;
    description: string;
    price: string;
    imageLink: string;
    published: boolean;
}>;
export type signupParams = z.infer<typeof signupValidation>;
export type courseParams = z.infer<typeof courseValidation>;
