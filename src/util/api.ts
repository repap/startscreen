export interface ApiResponse {
  data: any,
  error: Error | null,
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
  
  await fetch(path)
    .then(res => res.json())
    .then(data => dispatch(successDispatcher(data)))
    .catch((err: Error) => dispatch(errorDispatcher(err)))
    .then(console.error);
  
  dispatch(loadingDispatcher(false));
}

export const getApiRoute = (path: string) => `/api/${path}`;
