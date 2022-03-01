//Styles
import "./Home.css";

import { projectFirestore } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import useSearch from "../../hooks/useSearch";

export default function Home() {
  //const {data, isPending, error} = useFetch("http://localhost:3000/recipes")
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { setTerm } = useSearch();
  
  useEffect(() => {
    setTerm("");
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          //setError("No recipes to load");
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
  }, [setTerm]);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading..</p>}
      {data && <RecipeList data={data} />}
    </div>
  );
}
