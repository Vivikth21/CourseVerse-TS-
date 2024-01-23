const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cors());

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const userSchema = new mongoose.Schema({
  username: {type: String},
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

const Admin = mongoose.model('Admin',adminSchema) ;
let User = mongoose.model('User',userSchema);
let Course = mongoose.model('Course',courseSchema);

const secret = "SuperS3cr3t";

const authenticateJwt = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token,secret,(err,user)=>{
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  }
  else{
    res.sendStatus(401);
  }
};

mongoose.connect('mongodb+srv://vivikth21:vanivivikth2004@cluster0.evrm4my.mongodb.net/',{dbName: "courses" });
// Admin routes
app.post('/admin/signup',async (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const {username,password} = req.headers;
  const findAdmin = await Admin.findOne({username,password});
  if(findAdmin){
    const token = jwt.sign({username,role: 'admin'},secret,{expiresIn:'1h'});
    res.status(200).send(`Admin Successfully logged in ${token}`);
  }
  else{
    res.status(401).send("Admin does not exist");
  }
});

app.post('/admin/courses',authenticateJwt,async (req, res) => {
  // logic to create a course
     const course = new Course(req.body);
     await course.save();
     res.json({message: "New Course has been added",courseID: course.id});
});

app.put('/admin/courses/:courseId',authenticateJwt,async (req, res) => {
  // logic to edit a course
  const objID = req.params.courseId;
  const findCourse = await Course.findByIdAndUpdate(objID,req.body,{new: true});
  if(findCourse){
    res.send("Course updated successfully");
  }
  else{
    res.send("Course with this ID does not exist");
  }

});

app.get('/admin/courses',authenticateJwt,async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.send({courses});
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const {username,password} = req.body;
  const findUser = await User.findOne({username});
  if(findUser){
    res.send("Username already exists");
  }
  else{
    const user = new User({username: username,password: password});
    user.save();
    res.send("User has been signed up");
  }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, secret ,{ expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
});

app.get('/users/courses',authenticateJwt, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published:true});
  res.json({courses});
});

app.post('/users/courses/:courseId',authenticateJwt, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if(course){
    const user = await User.findOne({username: req.user.username});
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    }
    else{
      res.status(401).send("User not found");
    }
  }
  else{
    res.status(401).send("Invalid course ID");
  }
  
});

app.get('/users/purchasedCourses',authenticateJwt,async (req, res) => {
  // logic to view purchased courses
  const purchase = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if(purchase){
    res.json({PurchasedCourses: purchase.purchasedCourses || []});
  }
  else{
    res.status(401).send("No courses found");
  }
});

app.get('/admin/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
  });

  app.get("/admin/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
