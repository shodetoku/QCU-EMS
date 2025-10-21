import express from 'express'

import { PORT } from './config/env.js'
import dotenv from "dotenv"
import enrollmentRoutes from "./routes/enrollment.route.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import {connectToDatabaseEnrollment, connectToDatabaseLearning, connectToDatabaseLibrary, connectToDatabaseServices} from './database/mongodb.js';

const app = express();
dotenv.config();
app.use(express.json());

//sending a request in the server
app.get('/', (req, res) => {
	res.send('Hello World');
});

// routes
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/admins", adminRoutes)

app.listen(PORT, async() => {
	console.log(`I am listening in http//localhost:${PORT}`)
	
	try {
		const libraryConn = await connectToDatabaseLibrary()
		const enrollmentConn = await connectToDatabaseEnrollment()
		const learningConn = await connectToDatabaseLearning()
		const servicestConn = await connectToDatabaseServices()
	} catch (error) {
		console.error('Database Connection Failed', error)
		process.exit(1)
	}
})

export default app