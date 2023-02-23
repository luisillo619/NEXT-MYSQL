import { pool } from "../../../config/db";

export default async function handlerProductsId(req, res) {
  // El params de node y express ahora se va a llamar query
  switch (req.method) {
    case "GET": {
      return await getProduct(req, res);
    }
    case "DELETE": {
      return await deleteProduct(req, res);
    }
    case "PUT": {
      return await updateProduct(req, res);
    }
    default:
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const [[result]] = await pool.query("SELECT * FROM product WHERE id = ?", [
      id,
    ]);
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  const [result] = await pool.query("DELETE FROM product WHERE id = ?", [id]);
  if (result.affectedRows) return res.status(204).json();
  else return res.status(404).json();
};

const updateProduct = async (req, res) => {
  const { id } = req.query;
  const { name, price, description } = req.body;
  const [result] = await pool.query(
    "UPDATE product SET name = ?, description = ?, price= ? WHERE id = ?",
    [name, description, price, id]
  );
  if (result.affectedRows) return res.status(204).json();
  else return res.status(404).json();
};
