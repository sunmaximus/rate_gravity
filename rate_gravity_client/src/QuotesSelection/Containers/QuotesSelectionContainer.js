import { connect } from 'react-redux';
import QuotesSelectionComponent from '../Components/QuotesSelectionComponent';
import {
  loanSizeInput,
  creditScoreInput,
  selectPropertyType,
  selectOccupancy,
  rateQuoteQuery,
} from '../modules/quotesSelection';

const mapStateToProps = (state) => ({ quotesSelection: state.quotesSelection });
const mapDispatchToProps = (dispatch) => ({
  loanSizeInput: (amount=0) => dispatch(loanSizeInput(amount)),
  creditScoreInput: (point=0) => dispatch(creditScoreInput(point)),
  selectPropertyType: (property='') => dispatch(selectPropertyType(property)),
  selectOccupancy: (occupancy='') => dispatch(selectOccupancy(occupancy)),
  rateQuoteQuery: (query={}) => dispatch(rateQuoteQuery(query, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuotesSelectionComponent);