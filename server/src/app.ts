import express from "express";
import cors from "cors";
import authRoute from "./routes/global/auth/auth.route";
import instituteRoute from "./routes/institute/institute.route";
import courseRoute from "./routes/institute/course/course.route";
import categoryRoute from "./routes/institute/category.route";
import instituteTeacherRoute from "./routes/institute/teacher/teacher.route";
import teacherRoute from "./routes/teacher/teacher.route";
import courseChapterRoute from "./routes/teacher/course/chapters/course-chapter-route";
import courseLessonRoute from "./routes/teacher/course/lessons/course-lesson-route";
import studentInstituteRoute from "./routes/student/institute/student-institute.route";

const app = express();
// ✅ Enable CORS for all origins (during development)
app.use(
  cors({
    // allow frontend/s
    origin: ["http://localhost:3000"],
    // if you're using cookies or auth headers
    credentials: true,
  })
);

app.use(express.json());
// INSTITUTE ROUTES
app.use("/api/auth", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", instituteTeacherRoute);

//TEACHER ROUTE
app.use("/api/teacher", teacherRoute);
app.use("/api/teacher/chapter", courseChapterRoute);
app.use("/api/teacher/lesson", courseLessonRoute);

// STUDENT ROUTE
app.use("/api/student", studentInstituteRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Digital Pathsala P2!");
});

export default app;
