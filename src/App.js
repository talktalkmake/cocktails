import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] =                       useState(false)
  const [type, setType] =                       useState('random')
  const [viewSingleDrink, setViewSingleDrink] = useState(false)
  const [searchTerm, setSearchTerm] =           useState('gin')
  // useEffect(() => {
  //   console.log(type, data);
  //   fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  //     .then(res => res.json())
  //     .then(json => setData(json))
  // .catch(error => console.log(error))
  // }, [type])
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchTerm)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(error => console.log(error))
  }, [searchTerm])
  return (
    <>
      <h1>Drinks!</h1>
      <button onClick={() => setType(Math.random())}>Get a random cocktail</button>
      <label htmlFor="search">Search by ingredient</label>
      <input type="text" onChange={event => setSearchTerm(event.target.value)} id="search" />
      {<h3>{searchTerm} ({data.length})</h3>}
      <div className="drinks-holder">
        {data && (
          data.drinks.map((drink, i) =>
            <div className="drink-holder" key={i}>
              <h2 className="drink__title">{drink.strDrink}</h2>
              <img src={drink.strDrinkThumb} className="drink__img" />
              {getIngredientsList(drink)}
              <p className="drink__view-more" onClick={() => setViewSingleDrink(drink.idDrink)}>More about this drink</p>
            </div>
          )
        )}
      </div>
    </>
  )
}

export default App;

const getIngredientsList = drink => {
  // return drink.map((item, i) => <li>{}</li>)
}
