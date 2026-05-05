export function getApiErrorMessage(error, fallback = 'Ocurrio un error. Intenta nuevamente.') {
  const data = error?.response?.data

  if (data?.fields) {
    return Object.values(data.fields).join(' ')
  }

  if (data?.message) return data.message
  if (error?.code === 'ERR_NETWORK') {
    return 'No se pudo conectar con la API. Revisa que el backend este encendido en http://localhost:8080.'
  }

  return fallback
}
