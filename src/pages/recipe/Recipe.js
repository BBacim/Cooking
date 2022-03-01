//Styles
import "./Recipe.css";

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
//import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { mode } = useTheme();
  const { id } = useParams();
  /*const { data, isPending, error } = useFetch(
    "http://localhost:3000/recipes/" + id
  );*/
  const history = useHistory();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) {
      setIsPending(true);
      projectFirestore
        .collection("recipes")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsPending(false);
            setData(doc.data());
          } else {
            setIsPending(false);
            setError("Could not find that recipe");
          }
        });
    }
    if (error)
      setTimeout(() => {
        history.push("/");
      }, 2000);
  }, [error, history, id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading..</p>}
      {data && (
        <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
}
