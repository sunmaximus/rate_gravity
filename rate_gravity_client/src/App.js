import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

import QuotesSelection from './QuotesSelection';
import QuotesTable from './QuotesTable';

class App extends Component {
  render() {
    return (
      <div className="">
        <Container>
          <QuotesSelection />
          <QuotesTable />
        </Container>

      </div>
    );
  }
}

export default App;
