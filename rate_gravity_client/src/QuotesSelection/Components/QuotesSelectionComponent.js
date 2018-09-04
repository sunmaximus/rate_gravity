import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import Dropdown from '../../shared/Components/Dropdown';
import '../css/quotesSelection.css';

class QuotesSelectionComponent extends Component {
  state = { dirty: false }
  getQuote(query) {
    const { loanSize, creditScore } = this.props.quotesSelection.quoteQuery;
    const creditScoreError = isNaN(creditScore) || creditScore < 300 || creditScore > 800;
    const loadSizeError = isNaN(loanSize) || loanSize <= 0;
    this.setState({ dirty: true })
    return !creditScoreError && !loadSizeError && this.props.rateQuoteQuery(query)
  }

  render() {
    const {
      quotesSelection,
      loanSizeInput,
      creditScoreInput,
      selectPropertyType,
      selectOccupancy,
    } = this.props;
    const { dirty } = this.state;
    const { loanSize, creditScore } = quotesSelection.quoteQuery;

    const propertyType = ['SingleFamily', 'Condo', 'Townhouse', 'MultiFamily'];
    const occupancyType = ['Primary', 'Secondary', 'Investment'];
    const creditScoreError = isNaN(creditScore) || creditScore < 300 || creditScore > 800;
    const loadSizeError = isNaN(loanSize) || loanSize <= 0;

    return (
      <div className='quote_selection__container'>
        <div className='quote_selection__query-container'>
          <div className='quote_selection__query-left'>
            <div className='quote_selection__input-container'>
              <div>Loan Size:</div>
              <Input
                onChange={(event) => loanSizeInput(event.target.value)}
                placeholder='Please enter amount greater than 0'
                className={`quote_selection__input${dirty && loadSizeError ? '-error' : ''}`}
              />
            </div>
            <div className='quote_selection__input-container'>
              <div>Credit Score:</div>
              <Input
                onChange={(event) => creditScoreInput(event.target.value)}
                placeholder='Please enter credit score between 300-800'
                className={`quote_selection__input${dirty && creditScoreError ? '-error' : ''}`}
              />
            </div>
          </div>

          <div className='quote_selection__query-right'>
            <div className='quote_selection__dropdown-container'>
              <div>Property Type:</div>
              <Dropdown
                selections={propertyType}
                callBack={selectPropertyType}
              />
            </div>
            <div className='quote_selection__dropdown-container'>
              <div>Occupancy:</div>
              <Dropdown
                selections={occupancyType}
                callBack={selectOccupancy}
              />
            </div>
          </div>        
        </div>

        <div className='quote_selection__get-quote'>
          <Button
            onClick={() => this.getQuote(quotesSelection.quoteQuery)}>
              Quote Rates
          </Button>
        </div>
      </div>
    );    
  }
}

QuotesSelectionComponent.propTypes = {
  quotesSelection: PropTypes.shape({
    loanSize: PropTypes.number,
    creditScore: PropTypes.number,
    propertyType: PropTypes.string,
    occupancy: PropTypes.string
  }).isRequired,
  loanSizeInput: PropTypes.func.isRequired,
  creditScoreInput: PropTypes.func.isRequired,
  selectPropertyType: PropTypes.func.isRequired,
  selectOccupancy: PropTypes.func.isRequired,
  rateQuoteQuery: PropTypes.func.isRequired,
}

export default QuotesSelectionComponent;