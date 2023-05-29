import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import loadingImage from '../../img/Infinity-loading.gif';
//https://loading.io/

const Container = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    z-index:10;
    background-color:white;
    opacity: 0.7;
    text-align:center;
    background-image:url(${loadingImage});
    background-repeat:no-repeat;
    background-position: center center;
`;

const Image = styled.img`
    
`;

class LoadingScreen extends Component {
    render() {
        if(this.props.loading){
            return (
                <Container data-testid="loading">
                    
                </Container>
            )
        }
        else{
            return null;
        }
    }
}

function mapStateToProps(state){
    return{
        loading:state.loading
    }
}
export default connect(mapStateToProps, null )(LoadingScreen);
