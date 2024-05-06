import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sockets from "./socket/init.js"; // Assuming init.js is also an ES module

// Basic variables
const port = 3000;

// Defining the Express app
const app = express();

// Adding Helmet to enhance Rest API's security
app.use(helmet());

// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enabling CORS for all requests
app.use(cors());

// Adding morgan to log HTTP requests
app.use(morgan("combined"));

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the client folder
app.use("/static", express.static(join(__dirname, "public")));

// Defining an endpoint to return client html
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});

// Starting socket and server
const server = createServer(app);
sockets(server);

server.listen(port, () => {
  console.log(`Listening @ localhost:${port}`);
});
