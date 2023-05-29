import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postErrorSlack } from '../../utils';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  } 

  componentDidCatch(error, info) {
    console.log("MEEC:"+error+" "+JSON.stringify(info));
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
    
    postErrorSlack(this.props.location.pathname, error, info, this.props.investigations.currentInvestigation);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h4>Something went wrong.</h4>;
    }
    return this.props.children;
  }
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}

export default withRouter(connect(mapStateToProps, null)(ErrorBoundary));

