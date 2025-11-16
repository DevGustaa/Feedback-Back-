const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Verifica e cria tabelas
const createDataFeedBack = require("./src/database/createDataFeedBack");
createDataFeedBack();

app.use(cors());
app.use(express.json());

// Rotas
const feedbackRoutes = require("./src/routes/feedbackRoutes");
app.use("/feedback", feedbackRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
