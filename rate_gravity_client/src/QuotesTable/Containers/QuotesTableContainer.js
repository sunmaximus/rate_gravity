import { connect } from 'react-redux';
import QuotesTableComponent from '../Components/QuotesTableComponent';
import { fetchQuote } from '../module/quotesTable';

const mapStateToProps = (state) => ({
  requestId: state.quotesSelection.requestId,
  table: state.quotesTable.table,
  loading: state.quotesTable.loading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuote: (requestId='') => dispatch(fetchQuote(requestId, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuotesTableComponent);