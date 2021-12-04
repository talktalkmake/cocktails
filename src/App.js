import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] =                       useState(false)
  const [type, setType] =                       useState("random")
  const [viewSingleDrink, setViewSingleDrink] = useState(false)
  const [searchTerm, setSearchTerm] =           useState(false)

  async function fetchRandomDrinks(){
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const json = await response.json();
      setData(json);
      console.log(json)
    } catch (error) {
      console.log("error", error);
    }
  }

  const getRandomDrinks = () => {
    return (
      <>
      <h1>Try a Random Drink</h1>
      <button onClick={() => fetchRandomDrinks()}>Get a random cocktail</button>
      <label htmlFor="search">Search by ingredient</label>
      <input type="text" onChange={event => {setSearchTerm(event.target.value); setType("search")}} id="search" />
      {data && `<h3>There are ${data.size} drinks "${searchTerm}"</h3>`}
      <div className="drinks-holder">
        {data && (
          data.drinks.map((drink, i) =>
            <div className="drink-holder" key={i}>
              <h2 className="drink__title">{drink.strDrink}</h2>
              <img src={drink.strDrinkThumb} className="drink__img" />
              <p className="drink__view-more" onClick={() => setViewSingleDrink(drink.idDrink)}>More about this drink</p>
            </div>
          )
        )
        }
      </div>
      </>
    )
  }

  const searchDrinks = () => {
    return (
      <>
      <h1>{`There are ${data.size} drinks "${searchTerm}"</h3>`}</h1>
      <button onClick={() => {fetchRandomDrinks(); setType("random")}}>Get a random cocktail</button>
      <label htmlFor="search">Search by ingredient</label>
      <input type="text" onChange={event => {setSearchTerm(event.target.value); setType("search")}} id="search" />
      <div className="drinks-holder">
        {data && (
          data.drinks.map((drink, i) =>
            <div className="drink-holder" key={i}>
              <h2 className="drink__title">{drink.strDrink}</h2>
              <img src={drink.strDrinkThumb} className="drink__img" />
              <p className="drink__view-more" onClick={() => setViewSingleDrink(drink.idDrink)}>More about this drink</p>
            </div>
          )
        )
        }
      </div>
      </>
    )
  }

  switch(type){
    case "random":
      return getRandomDrinks()
    case "search":
      return searchDrinks()
    break
  }

}

export default App;
