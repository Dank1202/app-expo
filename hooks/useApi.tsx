// useApi.tsx
import { useState, useEffect } from 'react';

const useFetch = <T,>(method: string, url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (body?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.message || 'Error en la respuesta del servidor');
      }

      setData(jsonData);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === 'GET') {
      fetchData();
    }
  }, [url, method]);

  return { data, loading, error, fetchData };
};

export default useFetch;
