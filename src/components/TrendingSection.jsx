import React from 'react'

export const TrendingSection = ({movie,number }) => {
  return (
        <li><p>{number}</p><img src= {movie.poster_url}alt="" /></li>
  )
}
