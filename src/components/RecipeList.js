//Styles
import "./RecipeList.css";
import Delete from "../assets/delete.svg";

import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { projectFirestore } from "../firebase/config";

export default function RecipeList({ data }) {
  const { mode } = useTheme();
  if (data.length === 0)
    return <div className="error">No recipes to load...</div>;

  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {data.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={Delete}
            alt="delete"
            className="delete"
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
