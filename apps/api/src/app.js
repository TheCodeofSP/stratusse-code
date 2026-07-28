const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const commentRoutes = require("./routes/comment.routes");
const profileRoutes = require("./routes/profile.routes");
const adminRoutes = require("./routes/admin.routes");
const libraryRoutes = require("./routes/library.routes");
const libraryCommentRoutes = require("./routes/libraryComment.routes");
const creatorRequestRoutes = require("./routes/creatorRequest.routes");
const adminContentRoutes = require("./routes/adminContent.routes");
const creatorRoutes = require("./routes/creator.routes");
const contactRoutes = require("./routes/contact.routes");
const sitemapRoutes = require("./routes/sitemap.routes");
const {
  notFoundMiddleware,
  errorMiddleware,
} = require("./middlewares/error.middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://stratusse-web.vercel.app",
  "https://stratusse.fr",
  "https://www.stratusse.fr",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.disable("x-powered-by");
app.use(helmet());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json({ limit: "100kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    project: "Stratusse_V1",
  });
});

app.use("/sitemap.xml", sitemapRoutes);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/", commentRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/library", libraryRoutes);
app.use("/", libraryCommentRoutes);
app.use("/creator-requests", creatorRequestRoutes);
app.use("/admin/content", adminContentRoutes);
app.use("/creators", creatorRoutes);
app.use("/contact", contactRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
