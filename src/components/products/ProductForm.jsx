import { useState } from 'react'

export default function ProductForm({ initialData = {}, loading = false, onSubmit, submitLabel = 'Guardar' }) {
  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    precio: initialData?.precio || '',
    descripcion: initialData?.descripcion || '',
    stock: initialData?.stock ?? '',
    imageUrl: initialData?.imageUrl || '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.nombre.trim()) nextErrors.nombre = 'El nombre es obligatorio.'
    if (form.nombre.trim().length > 150) nextErrors.nombre = 'El nombre no puede superar 150 caracteres.'
    if (form.descripcion.length > 1000) {
      nextErrors.descripcion = 'La descripcion no puede superar 1000 caracteres.'
    }
    if (form.precio === '' || Number(form.precio) < 0) {
      nextErrors.precio = 'El precio debe ser cero o mayor.'
    }
    if (form.stock === '' || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock))) {
      nextErrors.stock = 'El stock debe ser un numero entero positivo.'
    }
    if (form.imageUrl.trim().length > 1000) {
      nextErrors.imageUrl = 'Usa un enlace de imagen. El servidor no acepta fotos subidas directamente.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      imageUrl: form.imageUrl,
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <label>
        Nombre del producto
        <input
          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
          name="nombre"
          placeholder="Ej: Uniforme diario SENA"
          value={form.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <small>{errors.nombre}</small>}
      </label>

      <label>
        Precio
        <input
          className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
          min="0"
          name="precio"
          placeholder="Ej: 85000"
          type="number"
          value={form.precio}
          onChange={handleChange}
        />
        {errors.precio && <small>{errors.precio}</small>}
      </label>

      <label>
        Stock
        <input
          className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
          min="0"
          name="stock"
          placeholder="Ej: 20"
          step="1"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />
        {errors.stock && <small>{errors.stock}</small>}
      </label>

      <label className="product-form__wide">
        Descripcion
        <textarea
          className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
          name="descripcion"
          placeholder="Describe talla, material, uso o detalles importantes."
          rows="5"
          value={form.descripcion}
          onChange={handleChange}
        />
        {errors.descripcion && <small>{errors.descripcion}</small>}
      </label>

      <section className="product-form__photo product-form__wide">
        <div>
          <span className="home-eyebrow">Foto del producto</span>
          <h2>Imagen para el catalogo</h2>
          <p>Pega el enlace de una imagen para que el servidor pueda guardarla correctamente.</p>
        </div>

        <label>
          Link de la foto
          <input
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            name="imageUrl"
            placeholder="https://ejemplo.com/foto-producto.jpg"
            value={form.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && <small>{errors.imageUrl}</small>}
        </label>

        <div className="product-form__preview">
          {form.imageUrl ? (
            <img src={form.imageUrl} alt="Vista previa del producto" />
          ) : (
            <span>Vista previa</span>
          )}
        </div>
      </section>

      <button className="btn btn-primary btn-lg product-form__wide" disabled={loading} type="submit">
        {loading ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}
