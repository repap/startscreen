import axios from 'axios';
import { serializeError } from 'serialize-error';

export interface ApiResponse {
  data: any,
  error: any,
  loading: boolean,
};

export const createInitialApiResponseData = () => ({
  data: null,
  error: null,
  loading: false,
});

export const fetchApi = (
  path: string,
  loadingDispatcher: Function,
  errorDispatcher: Function,
  successDispatcher: Function,
) => async (dispatch: Function) => {
  dispatch(loadingDispatcher(true));
  try {
    const { data } = await axios.get(path);
    dispatch(successDispatcher(data))
  } catch (err) {
    dispatch(errorDispatcher(serializeError(err)))
  }
  dispatch(loadingDispatcher(false));
}
