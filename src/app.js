import express from 'express'
import {config}  from './config/config.js'
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import courseRoutes from './routes/course.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js'
import Conexion from './config/conexion.js';
import { generateCustomResponses } from './utils/generateCustomResponses.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/auth.config.js';

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
initializePassport();
app.use(generateCustomResponses)

app.use('/api/admin', adminRoutes)
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/tickets',ticketRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes)

Conexion.getInstance();

app.listen(app.listen(config.port, () => console.log(`Server running on port ${config.port}`))) 