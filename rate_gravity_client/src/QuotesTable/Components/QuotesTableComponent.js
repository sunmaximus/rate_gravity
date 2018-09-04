import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

import loadingSVG from '../assets/loading.svg'
import '../css/quotesTable.css'
class QuotesTableComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.requestId !== prevProps.requestId) {
      this.props.fetchQuote(this.props.requestId);
    }
  }

  renderTableRow = () => {
    const { requestId, table } = this.props;
    if (requestId && table.length > 0) {
      return table.map((quote, index) => (
        <tr key={`${index}-${quote.lenderName}`}>
          <td>{quote.lenderName}</td>
          <td>{quote.loanType}</td>
          <td>{quote.interestRate}</td>
          <td>{quote.closingCosts}</td>
          <td>{quote.monthlyPayment}</td>
          <td>{quote.apr}</td>
        </tr>
      ));
    }

  }

  render() {
    if (this.props.loading) {
      return (<div className='quote-table__loading-container'><img src={loadingSVG} /></div>);
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>Lender Name</th>
            <th>Loan Type</th>
            <th>Interest Rate</th>
            <th>Closing Costs</th>
            <th>Monthly Payment</th>
            <th>APR</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRow()}
        </tbody>
      </Table>
    );
  }
}

QuotesTableComponent.propTypes = {
  requestId: PropTypes.string.isRequired,
  table: PropTypes.arrayOf(
    PropTypes.shape({
      lenderName: PropTypes.string.isRequired,
      loanType: PropTypes.string.isRequired,
      interestRate: PropTypes.number.isRequired,
      closingCosts: PropTypes.number.isRequired,
      monthlyPayment: PropTypes.number.isRequired,
      apr: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default QuotesTableComponent;