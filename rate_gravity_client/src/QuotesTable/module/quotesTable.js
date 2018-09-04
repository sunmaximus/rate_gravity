import axios from 'axios';

export const FETCH_QUOTE = 'FETCH_QUOTE';
export const FETCH_QUOTE_RECIEVED = 'FETCH_QUOTE_RECIEVED';
export const FETCH_QUOTE_ERROR = 'FETCH_QUOTE_ERROR';

export const fetchQuote = (requestId, dispatch) => {
  return (dispatch) => {
    dispatch({type : FETCH_QUOTE, requestId });
    // Got a 200 response back when sending a new requestId
    // The api wasn't fast enough and keep getting empty array
    setTimeout(() => axios.get(`http://www.localhost:4000/ratequotes/${requestId}`)
      .then(
        response => dispatch({type : FETCH_QUOTE_RECIEVED, payload : response }),
        error => dispatch({type : FETCH_QUOTE_ERROR, error : error})
      ), 7000);
  };
}

const defaultState = { loading: false, table: [] };

const quotesTableReducer = (state=defaultState, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
      return {...state, loading: true};
    case FETCH_QUOTE_RECIEVED:
      return {loading: false, table: action.payload.data};
    case FETCH_QUOTE_ERROR:
      return {...state, loading: false};
    default:
      return state;
  }
}

export default quotesTableReducer;