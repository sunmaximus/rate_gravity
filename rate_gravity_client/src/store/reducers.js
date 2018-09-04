import { combineReducers } from 'redux'
import quotesSelectionReducer from '../QuotesSelection/modules/quotesSelection';
import quotesTableReducer from '../QuotesTable/module/quotesTable';

const rootReducer = combineReducers({
  quotesSelection: quotesSelectionReducer,
  quotesTable: quotesTableReducer
});
  
export default rootReducer;