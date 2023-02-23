import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { NoNavLayout } from "../../components/NoNavLayout";
import Swal from "sweetalert2";



function ProductPage({ product, statusCode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/products/${id}`);
      setLoading(false);
      if (res.status === 204) {
        Swal.fire({
          icon: "success",
          title: "Producto Eliminado",
          html: `<p>El producto fue eliminado exitosamente</p>`,
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/");
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar el Producto",
        html:
          error.response.status === 404
            ? `<p>Producto inexistente <b>No</b> puede ser eliminado</p>`
            : `<p>Error interno del servidor</p>`,
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        // mostrar un boton de reintentar y cancelar
      });
    }
  };

  if (product) {
    return (
      <NoNavLayout>
        <p>{product.name}</p>
        <p> {product.price}</p>
        <p> {product.description}</p>
        <button
          disabled={loading}
          className="bg-red-500 hover:bg-red-700 px-3 py-2 text-white rounded"
          onClick={() => handleDelete(product.id)}
        >
          Eliminar
        </button>
        <button
          disabled={loading}
          className="bg-gray-500 hover:bg-gray-800 ml-2 px-5 py-2 text-white rounded"
          onClick={() => router.push(`/products/edit/${product.id}`)}
        >
          Editar
        </button>
        {loading && "cargando"}
      </NoNavLayout>
    );
  } else {
    return <div>Producto no encontrado {statusCode}</div>;
  }
}

export const getServerSideProps = async (context) => {
  try {
    console.log("pepe")
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.id}`
    );
    console.log(data)
    return {
      props: { product: data },
    };
  } catch (error) {
    console.log(error);
    const statusCode = error.response ? error.response.status : 500;
    if (statusCode === 404) {
      return { notFound: true };
    } else {
      return { props: { statusCode } };
    }
  }
};

export default ProductPage;
