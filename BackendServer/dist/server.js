"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const packages_1 = require("@vivikth21/packages");
const packages_2 = require("@vivikth21/packages");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});
const Admin = mongoose_1.default.model('Admin', adminSchema);
let User = mongoose_1.default.model('User', userSchema);
let Course = mongoose_1.default.model('Course', courseSchema);
const secret = "SuperS3cr3t";
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secret, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers["userId"] = payload.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
const uri = process.env.MONGODB_URI;
mongoose_1.default.connect(uri, { dbName: "courses3" });
// Admin routes
app.post('/admin/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = packages_1.signupValidation.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            error: parsedInput.error
        });
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const admin = yield Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}));
app.post('/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to log in admin
    const { username, password } = req.headers;
    const findAdmin = yield Admin.findOne({ username, password });
    if (findAdmin) {
        const token = jsonwebtoken_1.default.sign({ id: findAdmin._id, role: 'admin' }, secret, { expiresIn: '1h' });
        res.status(200).send(`Admin Successfully logged in ${token}`);
    }
    else {
        res.status(401).send("Admin does not exist");
    }
}));
app.post('/admin/courses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedCourse = packages_2.courseValidation.safeParse(req.body);
    if (!parsedCourse.success) {
        res.status(411).json({
            Error: parsedCourse.error
        });
        return;
    }
    // logic to create a course
    const course = new Course(parsedCourse.data);
    //  const course = new Course(req.body);
    yield course.save();
    res.json({ message: "New Course has been added", courseID: course.id });
}));
app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to edit a course
    const objID = req.params.courseId;
    const findCourse = yield Course.findByIdAndUpdate(objID, req.body, { new: true });
    if (findCourse) {
        res.send("Course updated successfully");
    }
    else {
        res.send("Course with this ID does not exist");
    }
}));
app.get('/admin/courses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to get all courses
    const courses = yield Course.find({});
    res.send({ courses });
}));
// User routes
app.post('/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to sign up user
    const { username, password } = req.body;
    const findUser = yield User.findOne({ username });
    if (findUser) {
        res.send("Username already exists");
    }
    else {
        const user = new User({ username: username, password: password });
        user.save();
        res.send("User has been signed up");
    }
}));
app.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: 'admin' }, secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
app.get('/users/courses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to list all courses
    const courses = yield Course.find({ published: true });
    res.json({ courses });
}));
app.post('/users/courses/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to purchase a course
    const course = yield Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const userId = req.headers["userId"];
        const user = yield User.findOne({ id: userId });
        if (user) {
            user.purchasedCourses.push(course._id);
            yield user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(401).send("User not found");
        }
    }
    else {
        res.status(401).send("Invalid course ID");
    }
}));
app.get('/users/purchasedCourses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to view purchased courses
    const userId = req.headers["userId"];
    const purchase = yield User.findOne({ id: userId }).populate('purchasedCourses');
    if (purchase) {
        res.json({ PurchasedCourses: purchase.purchasedCourses || [] });
    }
    else {
        res.status(401).send("No courses found");
    }
}));
app.get('/admin/course/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield Course.findById(courseId);
    res.json({ course });
}));
app.get("/admin/me", authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const admin = yield Admin.findOne({ id: userId });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({
        username: admin.username
    });
}));
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
