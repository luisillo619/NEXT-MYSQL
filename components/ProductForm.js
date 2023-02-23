import useCreate from "@/hooks/useCreate";

const initialForm = {
  name: "",
  price: "",
  description: "",
};

const validateForm = (form) => {
  const errors = {};
  const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexNumber = /^[0-9]+$/;

  // name
  if (!form.name.trim()) {
    errors.name = "Debes ingresar el nombre del producto";
  } else if (!regexText.test(form.name.trim())) {
    errors.name =
      "Debes ingresar un texto sin numeros ni caracteres especiales";
  } else if (form.name.trim().length > 30) {
    errors.name = "El nombre del producto debe contener menos de 30 caracteres";
  }

  // price
  if (!form.price.trim()) {
    errors.price = "Debes ingresar el precio del producto";
  } else if (!regexNumber.test(form.price.trim())) {
    errors.price = "Debes ingresar un numero";
  } else if (form.price.trim().length > 10) {
    errors.price = "El precio no puede tener mas de 10 caracteres";
  }

  // description
  if (!form.description.trim()) {
    errors.description = "Debes ingresar la descripcion del producto";
  } else if (!regexText.test(form.description.trim())) {
    errors.description =
      "Debes ingresar un texto sin numeros ni caracteres especiales";
  } else if (form.description.trim().length > 400) {
    errors.description = "La descripcion no puede tener mas de 400 caracteres";
  }
  return errors;
};

export function ProductForm() {
  const { form, handleChange, handleBlur, handleSubmit, loading, errors } =
    useCreate(initialForm, validateForm);
  return (
    <div className="bg-gray-300">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && errors.name}
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          name="price"
          id="price"
          value={form.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors && errors.price}
        <label htmlFor="description">Descripcion:</label>
        <textarea
          name="description"
          id=""
          rows="2"
          value={form.description}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        {errors && errors.description}
        <button disabled={loading}>Guardar producto</button>
        {loading && "CARGANDO"}
      </form>
    </div>
  );
}
