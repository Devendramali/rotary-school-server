require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const officerRoutes = require("./routes/officerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const memberRoutes = require("./routes/memberRoutes");
const path = require("path");
const noticeRoutes = require("./routes/noticeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");
const swayamRoutes = require("./routes/swayamRoutes");
// .
const govProgramsRoutes = require("./routes/govProgramRoutes");
const gloriousRoutes = require("./routes/gloriousRoutes");
const metricRoutes = require("./routes/metricRoutes");
const schoolCountRoutes = require("./routes/schoolCountRoutes");
const implinksRoutes = require("./routes/implinksRoutes")
const banner = require("./routes/bannerRoute")
const mananiyAdhikariRoutes = require("./routes/mananiyAdhikariRoutes");

const presidentRoutes = require("./routes/presidentRoutes");
const principleRoutes = require("./routes/principleRoutes");
const activityRoutes = require("./routes/activityRoutes");
const activityCategoryRoutes = require("./routes/activityCategoryRoutes");
const textbookRoutes = require("./routes/textbookRoutes");
const studentStrengthRoutes = require("./routes/studentStrengthRoutes");
const alumniRoutes = require("./routes/alumniRoutes");
const annualReportRoutes = require("./routes/annualReportRoutes");
const pressReleaseRoutes = require("./routes/pressReleaseRoutes");
const shashanNirnayRoutes = require("./routes/shashanNirnayRoutes");
const feeRoutes = require("./routes/feeRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const ptaRoutes = require("./routes/ptaRoutes");


const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5000",
    "https://rotary-school-admin.vercel.app/"
    // "https://admin-palsun.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());

// Serve uploads folders statically **before API routes**
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 app.use("/uploads/banners", express.static("uploads/banners"));


 


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/officers", officerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/schoolcount", schoolCountRoutes);

// Notic

app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/uploads/notices", express.static(path.join(__dirname, "../uploads/notices")));
app.use("/uploads/swayamGhoshna", express.static("uploads/swayamGhoshna"));

app.use("/api/swayamGhoshna", swayamRoutes);

// contact
app.use("/api/contacts", require("./routes/contactRoutes"));

app.use("/api/suvichar", require("./routes/suvicharRoutes"));

// mananiyadhikari
app.use("/api/mananiy-adhikari", mananiyAdhikariRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/govPrograms", govProgramsRoutes);

app.use("/uploads", express.static("src/uploads"));
app.use("/api/gallery", galleryRoutes);

app.use("/api/mahiti", require("./routes/mahitiRoutes"));

app.use("/api/awards", require("./routes/awardRoutes"));

app.use("/api/expenditure", expenditureRoutes);

app.use("/api/gloriousPersons", gloriousRoutes);
app.use("/api/implinks", implinksRoutes);


app.use("/api/banner", banner);

app.use("/api/",require("./routes/awsRoutes"))

app.use("/api/president", presidentRoutes);
app.use("/api/principle", principleRoutes);

app.use("/api/activities", activityRoutes);
app.use("/api/activity-categories", activityCategoryRoutes);
app.use("/api/textbooks", textbookRoutes);
app.use("/api/student-strength", studentStrengthRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/annual-reports", annualReportRoutes);
app.use("/api/press-release", pressReleaseRoutes);
app.use("/api/shashannirnay", shashanNirnayRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/pta", ptaRoutes);



// Root route
app.get("/", (req, res) => {
  res.send("🚀 Server with MongoDB Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
