import app from "../Firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const db = getFirestore()

const useFetch = (token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = []
    let rawData

    const fetchSomething = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, `users/${token}/someNotes`))
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          rawData = doc.data()
          rawData.id = doc.id
          data.push(rawData)
        })
        setData(data)
        setIsPending(false)
        setError(null)
      } catch (error) {
        setIsPending(false)
        setError(error.message)
      }  
    }
    fetchSomething()
  }, [token])

  return {data, isPending, error, setData}
}

export default useFetch