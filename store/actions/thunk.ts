import axios from 'axios';

export function commonFetch(options: { [method: string]: any; URL: any; type: any; }) {
  const { URL, type, ...rest } = options;
  return async (dispatch: (object: { type: any; payload: any; }) => void) => {
    await axios(URL, { ...rest })
      .then((responseData) => {
        dispatch({ type, payload: responseData?.data || [] });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
}
