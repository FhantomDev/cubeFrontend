import { useState, useEffect } from 'react';
import cubeApi from '../api/cube';

const useCubeData = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    cubeApi
      .load(query)
      .then((resultSet) => {
        setData(resultSet.tablePivot());
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [JSON.stringify(query)]); // Vuelve a ejecutar el efecto si la consulta cambia

  return { data, loading, error };
};

export default useCubeData;
