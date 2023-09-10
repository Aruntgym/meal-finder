import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import Recipecard from "./components/Recipecard";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLonding, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([])

  // function to search for the recipes

  const searcRecipes = async ()=> {{
    setIsLoading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setRecipes(data.meals);
    setIsLoading(false);
  }}

      useEffect(()=>{
        searcRecipes();
      })

        const handleSubmit = event => {
          event.preventDefault()
          searcRecipes()
        }

  return (
    <div className="container">
    <h2>MealFinderDB</h2>
    <SearchBar
      handleSubmit={handleSubmit}
      value={query}
      onChange={event => setQuery(event.target.value)}
      isLonding={isLonding}
    />
  
    <div className="recipes">
      {recipes ? recipes.map((recipe) => (
        <Recipecard key={recipe.idMeal} recipe={recipe}/>
      ))
        : "No Recipes!"}
    </div>
    </div>
  );
}

export default App;
