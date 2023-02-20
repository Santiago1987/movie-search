import { useEffect, useRef, useState } from 'react'

export const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  // para que no haga control de errores si el usuario no entro nada
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('no se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }

    if (search.length < 3) {
      setError('la buqueda tine que tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
