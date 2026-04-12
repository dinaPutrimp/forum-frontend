import type { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useToast } from "../contexts/ToastContext";

const useFetch = () => {
  const { showToast } = useToast();
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async <T>(config: AxiosRequestConfig): Promise<T> => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await axiosInstance(config);
        console.log(response);
        setData(response.data);
        setLoading(false);
        return response.data as T;
      } catch (error: any) {
        const message = error?.response?.data?.message || "Terjadi Kesalahan";
        setError(message);
        setLoading(false);
        showToast(message);
        throw error;
      }
    },
    []
  );

  return { data, loading, error, execute };
};

export default useFetch;
