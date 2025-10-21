import mongoose from "mongoose";

const enrollmentDB = mongoose.createConnection(process.env.ENROLLMENT_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

enrollmentDB.on("connected", () => {
  console.log("✅ Connected to Enrollment Database");
});

export default enrollmentDB;
