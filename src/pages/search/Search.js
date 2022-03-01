//Styles
import "./Search.css";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  /*const URL = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(URL);*/
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .where("title", "==", query)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setData([]);
            setIsPending(false);
          } else {
            let result = [];
            snapshot.docs.forEach((doc) =>
              result.push({ id: doc.id, ...doc.data() })
            );
            setData(result);
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );

    return () => unsub();
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading..</p>}
      {data && <RecipeList data={data} />}
    </div>
  );
}
