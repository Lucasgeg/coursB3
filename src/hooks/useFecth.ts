import axios from "axios";
import { useEffect, useState } from "react";

type UseFetchProps = {
  url: string;
};

export const useFetch = <T>({ url }: UseFetchProps) => {
  const [results, setResults] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url);
        if (response.status >= 200 && response.status < 300) {
          setTimeout(() => {
            setResults(response.data);
          }, 3000);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data);
        } else {
          setError((error as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [url]);

  return { results, loading, error };
};
