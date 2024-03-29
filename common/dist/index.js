"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = exports.signupValidation = void 0;
const zod_1 = require("zod");
exports.signupValidation = zod_1.z.object({
    username: zod_1.z.string().min(1).max(15),
    password: zod_1.z.string().min(3).max(10).refine((password) => {
        return /[a-zA-Z]/.test(password) && /\d/.test(password);
    }, {
        message: "Password must have atleast one letter and a number"
    })
});
exports.courseValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).max(10),
    description: zod_1.z.string().min(5).max(30),
    price: zod_1.z.string().min(1),
    imageLink: zod_1.z.string().min(1),
    published: zod_1.z.boolean()
});
