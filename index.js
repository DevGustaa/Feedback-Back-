const express = require("express");
const cors = require("cors");
require("dotenv").config();

const createDatabase = require("./src/database/createDatabase");
const createDataFeedBack = require("./src/database/createDataFeedBack");

const app = express();

async function startServer() {
  //cria o database
  await createDatabase();

  //cria as tabelas
  await createDataFeedBack();

  app.use(cors());
  app.use(express.json());

  const feedbackRoutes = require("./src/routes/feedbackRoutes");
  app.use("/feedback", feedbackRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
}

startServer();
