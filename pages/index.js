import { Layout } from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Layout>
      {products.length ? (
        products.map((product) => (
          <div key={product.id} className="border border-gray-200 shadow-md p-6">
            <Link href={`/products/${product.id}`}>
              <div className="flex justify-evenly bg-blue-700 bg-opacity-50">
                <h1>Nombre: {product.name}</h1>
                <p>Descripcion: {product.description}</p>
                <p>Precio: {product.price}</p>
                <p>Id: {product.id}</p>
              </div>
            </Link>
            <p>Desactivar o activar</p>
          </div>
        ))
      ) : (
        <div>Sin productos actualmente</div>
      )}
    </Layout>
  );
}

export default HomePage;
