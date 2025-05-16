import express from 'express';
import clientsRoutes from "./src/routes/clients.js"
import employeeRoutes from "./src/routes/employees.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import moviesRoutes from "./src/routes/movies.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
import registerClient from "./src/routes/registerClient.js"
import registerEmployee from "./src/routes/registerEmployee.js"
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/recoveryPassword", recoveryPassword);
app.use("/api/registerClient", registerClient);
app.use("/api/registerEmployee", registerEmployee);

export default app;
