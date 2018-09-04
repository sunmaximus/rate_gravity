import axios from 'axios';

export const LOAN_SIZE_INPUT = 'LOAN_SIZE_INPUT';
export const CREDIT_SCORE_INPUT = 'CREDIT_SCORE_INPUT';
export const SELECT_PROPERTY_TYPE='SELECT_PROPERTY_TYPE';
export const SELECT_OCCUPANCY='SELECT_OCCUPANCY';

export const RATE_QUOTE_QUERY = 'RATE_QUOTE_QUERY';
export const RATE_QUOTE_QUERY_RECIEVED = 'RATE_QUOTE_QUERY_RECIEVED';
export const RATE_QUOTE_QUERY_ERROR = 'RATE_QUOTE_QUERY_ERROR';

export const loanSizeInput = (amount=0) => ({ type: LOAN_SIZE_INPUT, loanSize: parseInt(amount) });
export const creditScoreInput = (point=0) => ({ type: CREDIT_SCORE_INPUT, creditScore: parseInt(point) });
export const selectPropertyType = (property='') => ({ type: SELECT_PROPERTY_TYPE, propertyType: property });
export const selectOccupancy = (occupancy='') => ({ type: SELECT_OCCUPANCY, occupancy });

export const rateQuoteQuery = (query, dispatch) => {
  return (dispatch) => {
    dispatch({type : RATE_QUOTE_QUERY, query});
    axios.post('http://www.localhost:4000/ratequotes', query)
      .then(
        response => dispatch({type : RATE_QUOTE_QUERY_RECIEVED, payload : response.data }),
        error => dispatch({type : RATE_QUOTE_QUERY_ERROR, error : error})
      );    
  };
}

const defaultState = {
  requestId: '',
  quoteQuery: {
    loanSize: 0,
    creditScore: 0,
    propertyType: 'SingleFamily',
    occupancy: 'Primary'
  }
}

const quoteQueryReducer = (state=defaultState, action) => {
  switch (action.type) {
    case LOAN_SIZE_INPUT:
      return {...state, quoteQuery: {...state.quoteQuery, loanSize: action.loanSize }};
    case CREDIT_SCORE_INPUT:
      return {...state, quoteQuery: {...state.quoteQuery, creditScore: action.creditScore}};
    case SELECT_PROPERTY_TYPE:
      return {...state, quoteQuery: {...state.quoteQuery, propertyType: action.propertyType}};
    case SELECT_OCCUPANCY:
      return {...state, quoteQuery: {...state.quoteQuery,occupancy: action.occupancy}};
    case RATE_QUOTE_QUERY_RECIEVED:
      return {...state, requestId: action.payload.requestId};
    default:
      return state;
  }
}
export default quoteQueryReducer;