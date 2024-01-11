import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, config) => {
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
  });

  const loadQuery = async (data, rest) => {
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise((resolve, reject) => {
      setLoading(true);
      instance({
        url: `${url}`,
        ...config,
        data,
        headers,
        ...rest,
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            resolve(response);
            setError(undefined);
            response.data != null && setResponse(response.data);
          } else {
            setError(response?.data);
            setErrorMessage(response?.data?.message ?? "Something went wrong!");
            setResponse(undefined);
          }
          setLoading(false);
        })
        .catch((e) => {
          if (e.response?.status === 401 || e.response?.status === 403) {
          } else if (e.response?.status === 404) {
            setResponse(undefined);
          } else {
            setResponse(undefined);
          }
          setErrorMessage(
            e.response?.data?.toString() ?? "Something went wrong!"
          );
          setError(e.response?.data);
          setTimeout(() => {
            setLoading(false);
          }, 1);
        });
    });
  };

  return [loadQuery, { response, loading, error, errorMessage }];
};

export default useFetch;
