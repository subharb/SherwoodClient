import React, { Component } from 'react'
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import successImage from '../../img/7893-confetti-cannons.gif';
import { ButtonContinue } from './mini_components'; 

const SuccessContainer = styled.div`
    text-align:center;
`;
export default class SuccessComponent extends Component {
    render() {
        return (
            <SuccessContainer>
                <h4><Translate id={this.props.title} /></h4>
                <div><img src={successImage} width="200" alt="Success!" /></div>
                <div><Translate id={this.props.description} /></div>
                <ButtonContinue data-testid="continue" onClick={this.props.callBackContinue} 
                    type="submit" key="continue" id="continue">
                        <Translate id={this.props.successButtonText} />
                </ButtonContinue>   
            </SuccessContainer>
        )
    }
}
