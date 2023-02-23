import { pool } from "../../../config/db";
import Joi from "joi";

export default async function handlerProducts(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getProducts(req, res);
      case "POST":
        return await saveProduct(req, res);
      default:
        return res.status(405).json({ message: "Método no permitido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM product");
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

const saveProduct = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, price, description } = req.body;
    const [result] = await pool.query(`INSERT INTO product SET ?`, {
      name,
      price,
      description,
    });
    return res
      .status(200)
      .json({ id: result.insertId, name, price, description });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};