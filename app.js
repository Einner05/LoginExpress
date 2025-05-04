const express = require("express");
const app = express();
const port = 3000;
// Get the client
const mysql = require("mysql2/promise");
const cors=require('cors')
const session = require('express-session')

app.use(cors({
    origin:'http//localhost:5178',
    credentials:true
}))
app.use(session({
    secret:'adjfhsdkjfhlsdkfjh'
}))

// Create the connection to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "login",
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/login", async (req, res) => {
    const datos = req.query;
  // A simple SELECT query
    try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` LIKE ? AND `contraseña` LIKE ?"[
        (datos.usuario, datos.contraseña)
    ]
    );
    if (results.length > 0) {
        req.session.usuario=datos.usuario;
        res.status(200).send("Inicio de sesion correcto");
    } else {
        res.status(401).send("Datos incorrectos");
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
    console.log(err);
}
});

app.get("/validar", (req, res) => {
    res.send("Sesion validada");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
