const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const session = require("express-session");

const login = require("./login");
const registro = require("./registro");
const obtenerProductos = require("./productos");
const { obtenerUsuarios, eliminarUsuarios } = require("./usuarios");
const validar = require("./validar");

app.use(
  cors({
    origin: "http://localhost:5173", // ✔️ ahora correcto
    credentials: true,
  })
);

app.use(
  session({
    secret: "adjfhsdkjfhlsdkfjh",
    resave: false,          // ✔️ recomendado por express-session
    saveUninitialized: false, // ✔️ recomendado también
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", login);
app.get("/validar", validar);
app.get("/registro", registro);
app.get("/productos", obtenerProductos);
app.get("/usuarios", obtenerUsuarios);
app.delete("/usuarios", eliminarUsuarios);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
