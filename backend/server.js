const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");  // Si usas MySQL
const app = express();
const port = 3002;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors());


// Parseo de cuerpo JSON en las solicitudes
app.use(express.json());

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // Tu usuario de base de datos
  password: "",      // Tu contraseña de base de datos
  database: "esxlegacy_2a449c",  // Nombre de tu base de datos
});

// Verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Ruta de login
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  // Verificar que los campos no estén vacíos
  if (!usuario || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
  }

  // Consultar la base de datos para obtener los datos del usuario
  const query = "SELECT * FROM administradores WHERE usuario = ?";
  db.query(query, [usuario], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      return res.status(500).json({ message: "Error al verificar las credenciales" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Comparar la contraseña proporcionada con la almacenada (usando bcrypt)
    const user = results[0];
    bcrypt.compare(password, user.contraseña, (err, isMatch) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).json({ message: "Error al verificar la contraseña" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }

      // Si la contraseña es correcta, enviar respuesta exitosa con el grupo
      res.json({
        message: "Inicio de sesión exitoso",
        user: {
          id: user.id,
          nombre: user.nombre,
          usuario: user.usuario,
          mail: user.mail,
          grupo: user.grupo,  // Enviar el grupo del usuario
          activo: user.activo
        }
      });
    });
  });
});


// Ruta para crear un administrador
app.post("/api/crear-administrador", (req, res) => {
  const { nombre, usuario, contraseña, email, grupo, activo } = req.body;

  // Verificar que los datos estén completos
  if (!nombre || !usuario || !contraseña || !email || !grupo) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  // Validar que el campo 'grupo' tenga un valor válido
  const gruposValidos = ['admin', 'mod', 'helper'];
  if (!gruposValidos.includes(grupo)) {
    return res.status(400).json({ message: "Grupo no válido. Los valores permitidos son 'admin', 'mod' o 'helper'" });
  }

  // Encriptar la contraseña antes de insertarla
  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error al encriptar la contraseña" });
    }

    // Preparar la consulta SQL para insertar el administrador
    const query = `INSERT INTO administradores (nombre, usuario, contraseña, mail, grupo, activo) VALUES (?, ?, ?, ?, ?, ?)`;

    // Ejecutar la consulta
    db.query(query, [nombre, usuario, hashedPassword, email, grupo, activo], (err, result) => {
      if (err) {
        console.error("Error al insertar datos:", err); // Imprimir el error en la consola para más detalles
        return res.status(500).json({ message: "Error al insertar los datos del administrador" });
      }

      // Responder con éxito
      res.status(200).json({ message: "Administrador creado correctamente", id: result.insertId });
    });
  });
});

app.post('/mostrar_datos_admin', (req, res) => {
  // Lógica del servidor aquí
});

app.get('/api/administradores', (req, res) => {
  console.log("Solicitud recibida para obtener los administradores.");
  db.query('SELECT * FROM administradores', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error al consultar la base de datos');
      return;
    }
    console.log("Datos obtenidos:", results);
    res.json(results); // Envía los resultados de la consulta como respuesta
  });
});


app.delete("/api/administradores/:id", (req, res) => {
  const { id } = req.params; // Obtener el ID desde la URL

  // Verificar que el ID sea válido
  if (!id) {
    return res.status(400).json({ message: "ID no proporcionado" });
  }

  // Preparar la consulta SQL para eliminar el administrador
  const query = "DELETE FROM administradores WHERE id = ?";

  // Ejecutar la consulta
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el administrador:", err);
      return res.status(500).json({ message: "Error al eliminar el administrador" });
    }

    // Si no se encuentra el administrador con el ID proporcionado
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Administrador eliminado correctamente" });
  });
});

app.put("/api/administradores/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, usuario, contraseña, mail, grupo, activo } = req.body;

  // Validar campos obligatorios
  if (!nombre || !usuario || !grupo) {
    return res.status(400).json({
      message: "Los campos 'nombre', 'usuario' y 'grupo' son obligatorios",
    });
  }

  // Normalizar el estado de 'activo'
  const estadoActivo = activo === "1" || activo === 1 ? 1 : 0;

  // Construir la consulta para actualizar la tabla
  let query = "UPDATE administradores SET nombre = ?, usuario = ?, mail = ?, grupo = ?, activo = ?";
  const params = [nombre, usuario, mail, grupo, estadoActivo];

  // Incluir contraseña si se proporciona
  if (contraseña) {
    query += ", contraseña = ?";
    const hashedPassword = bcrypt.hashSync(contraseña, 10); // Encripta la contraseña
    params.push(hashedPassword);
  }

  query += " WHERE id = ?";
  params.push(id);

  // Ejecutar la consulta
  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error al actualizar administrador:", err);
      return res.status(500).json({ message: "Error en la base de datos" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el administrador con el ID especificado" });
    }

    res.status(200).json({ message: "Administrador actualizado correctamente" });
  });
});





// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


