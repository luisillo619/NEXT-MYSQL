import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

function useCreate(initialForm, validateForm) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setForm({
          name: data.name,
          price: data.price,
          description: data.description,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Producto no Existente",
          html: `<p>No se ha encontrado el producto con id: ${id} </p>`,
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          // agregar para ir a crear
          router.push("/");
        });
      }
    };
    if (router.query?.id) {
      getProduct(router.query.id);
    }
  }, [router.query?.id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = () => {
    setErrors(validateForm(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(form);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);

      try {
        if (router.query?.id) {
          const res = await axios.put(
            `/api/products/${router.query?.id}`,
            form
          );
          setLoading(false);
          if (res.status === 204) {
            Swal.fire({
              icon: "success",
              title: "Producto Modificado",
              html: `<p>El producto fue modificado exitosamente</p>`,
              timer: 3500,
              showConfirmButton: false,
            }).then(() => {
              // agregar dos botones, volver a modificar o ver todos los productos
              router.push("/");
            });
          }
        } else {
          const res = await axios.post("/api/products", {
            name: form.name,
            price: form.price,
            description: form.description,
          });
          setForm(initialForm);
          setLoading(false);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Producto Creado",
              html: `<p>El producto fue creado exitosamente</p>`,
              timer: 3500,
              showConfirmButton: false,
            }).then(() => {
              // agregar dos botones, crear otro producto o ver todos los productos
              router.push("/");
            });
          }
        }
      } catch (error) {
        setForm(initialForm);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al crear o midificar el Producto",
          html: `<p>El producto <b>NO</b> pudo ser creado o modificado${"error.message"}</p>`,
          timer: 3500,
          showConfirmButton: false,
        });
      }
    }
  };

  return {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    errors,
  };
}

export default useCreate;
