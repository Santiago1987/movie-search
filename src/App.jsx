import { useCallback, useState } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 500), [])

  // FORMA NO CONTROLADA POR REACT
  /* const handleSubmit = (event) => {
    event.preventDefault()

    // esto es vanilla JS usando los elementos del dom
    // especialmente util cuando se tiene muchos inputs y queremos recuperar todos los elementos
    // al momento del submit
    const { query } = Object.fromEntries(
      new window.FormData(event.target)
    )

    console.log(search)
  } */

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  // FORMA CONTROLADA
  const handleOnChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' onChange={handleOnChange} value={search} placeholder='Avengers, Matrix ....' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>BUSCAR</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {loading
          ? <p>Loading</p>
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
