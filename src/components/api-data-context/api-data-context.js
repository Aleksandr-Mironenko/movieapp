import React, { createContext, useState, useEffect } from 'react'

export const GanresContext = createContext()

export function GanresProvider({ children }) {
  const [listGenre, setListGenre] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=ebfde52ea649f852ab8ef2c3835d90a0'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch genres')
      }
      const data = await response.json()
      setListGenre(data.genres)
    }

    fetchData()
  }, [])
  console.log(listGenre)
  return <GanresContext.Provider value={listGenre}>{children}</GanresContext.Provider>
}
