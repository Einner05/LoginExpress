const connection = require("./connection");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const datos = req.query;
  try {
    // Buscar el usuario en base de datos
    const [results, fields] = await connection.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [datos.usuario]
    );

    if (results.length > 0) {
      const usuarioDB = results[0];

      // Comparar la clave encriptada con la ingresada
      if (bcrypt.compareSync(datos.clave, usuarioDB.clave)) {
        req.session.usuario = datos.usuario;
        res.status(200).send("Inicio de sesion correcto");
      } else {
        res.status(401).send("Datos incorrectos");
      }
    } else {
      res.status(401).send("Usuario no encontrado");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = login;
