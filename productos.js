const connection = require("./connectionpro");

const obtenerProductos = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("No autorizado");
    return;
  }
  try {
    const [results, fields] = await connection.query("SELECT * FROM productos");
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = obtenerProductos;
