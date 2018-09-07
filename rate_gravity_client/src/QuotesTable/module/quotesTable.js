import axios from 'axios';

export const FETCH_QUOTE = 'FETCH_QUOTE';
export const FETCH_QUOTE_RECIEVED = 'FETCH_QUOTE_RECIEVED';
export const FETCH_QUOTE_FINISHED = 'FETCH_QUOTE_FINISHED';

export const FETCH_QUOTE_ERROR = 'FETCH_QUOTE_ERROR';

export const fetchFinished = (response) => ({ type: FETCH_QUOTE_FINISHED, payload: response });

export const fetchQuote = (requestId, dispatch) => {
  return (dispatch) => {
    dispatch({type : FETCH_QUOTE, requestId });
    return axios.get(`http://www.localhost:4000/ratequotes/${requestId}`)
      .then(
        response => {
          if (response.data.done) {
            return dispatch(fetchFinished(response));
          }
          dispatch({ type: FETCH_QUOTE_RECIEVED, payload: response });
          setTimeout(() => dispatch(fetchQuote(requestId, dispatch)), 500)
        },
        error => dispatch({ type : FETCH_QUOTE_ERROR, error : error })
      )
  };
}

const defaultState = { loading: false, table: [] };

const quotesTableReducer = (state=defaultState, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
      return { ...state, loading: true };
    case FETCH_QUOTE_RECIEVED:
      return { ...state, table: action.payload.data.rateQuotes, loading: true };
    case FETCH_QUOTE_ERROR:
      return { ...state, loading: false };
    case FETCH_QUOTE_FINISHED:
      return { ...state, table: action.payload.data.rateQuotes, loading: false };
    default:
      return state;
  }
}

export default quotesTableReducer;