import { useState, useEffect } from 'react'
import { ApiResponse } from './api';
import axios from 'axios';
import { serializeError } from 'serialize-error';

const useApiLoader = (path: string): ApiResponse => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchApi = async() => {
      setLoading(true)
        
      const { data, error } = await (await axios.get(path)).data;

      if ( data ) {
        setData(data)
      }

      if ( error ) {
        console.error(error)
        setError(serializeError(error))
      }

      setLoading(false)
    }
    
    fetchApi();
  }, [path])

  return { data, error, loading }
}

export default useApiLoader;
