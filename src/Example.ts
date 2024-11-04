import axios, { AxiosError } from "axios";
import { useEffect, useReducer } from "react";

interface AsyncStateProps<T> {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
}

type AsyncStateAction<T> =
  | { type: "loading" }
  | { type: "error"; payload: AxiosError }
  | { type: "success"; payload: T };

interface UseAsyncStateProps {
  url: string;
}

const reducer = <T>(state: AsyncStateProps<T>, action: AsyncStateAction<T>) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: undefined };
    case "error":
      return { ...state, loading: false, error: action.payload.message };
    case "success":
      return { data: action.payload as T, loading: false, error: undefined };
    default:
      return state;
  }
};

export const useAsyncState = <T>({
  url,
}: UseAsyncStateProps): AsyncStateProps<T> => {
  const initialState: AsyncStateProps<T> = {
    data: undefined,
    loading: false,
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer<T>, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await axios.get<T>(url);
        dispatch({ type: "success", payload: response.data });
      } catch (error) {
        dispatch({
          type: "error",
          payload:
            error instanceof AxiosError
              ? error
              : new AxiosError("An error occurred"),
        });
      }
    };
    fetchData();
  }, [url]);

  return state;
};
