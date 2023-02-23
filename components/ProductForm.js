import useCreate from "@/hooks/useCreate";

const INITIAL_PRODUCT_DATA = {
  name: "",
  price: "",
  description: "",
};

const REGEX_TEXT = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const REGEX_NUMBER = /^[0-9]+$/;

const validateForm = (formData) => {
  const errors = {};

  // name
  if (!formData.name.trim()) {
    errors.name = "Debes ingresar el nombre del producto";
  } else if (!REGEX_TEXT.test(formData.name.trim())) {
    errors.name =
      "Debes ingresar un texto sin numeros ni caracteres especiales";
  } else if (formData.name.trim().length > 30) {
    errors.name = "El nombre del producto debe contener menos de 30 caracteres";
  }

  // price
  if (!formData.price.trim()) {
    errors.price = "Debes ingresar el precio del producto";
  } else if (!REGEX_NUMBER.test(formData.price.trim())) {
    errors.price = "Debes ingresar un numero";
  } else if (formData.price.trim().length > 10) {
    errors.price = "El precio no puede tener mas de 10 caracteres";
  }

  // description
  if (!formData.description.trim()) {
    errors.description = "Debes ingresar la descripcion del producto";
  } else if (!REGEX_TEXT.test(formData.description.trim())) {
    errors.description =
      "Debes ingresar un texto sin numeros ni caracteres especiales";
  } else if (formData.description.trim().length > 400) {
    errors.description = "La descripcion no puede tener mas de 400 caracteres";
  }

  return errors
};

export function ProductForm() {
  const {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoading,
    errors,
  } = useCreate(INITIAL_PRODUCT_DATA, validateForm);
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
        <button disabled={isLoading}>Guardar producto</button>
        {isLoading && "CARGANDO"}
      </form>
    </div>
  );
}
