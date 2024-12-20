import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";


import { RegisterRoutes } from "./routes/index"; // tsoa va générer ce fichier

const PORT = process.env.PORT || 8000;

const app: Application = express();


app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
var cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

RegisterRoutes(app);
export { app };
