import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

const BreadCrumbContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const BreadButton = styled.button`
    &:last-child {
        color: rgba(255,255,255,0.7);
    }
    &:focus {
        background: none;
    }
    background: none;
    border: none;
    line-height: unset;
    color:${props => props.selected ? 'rgba(255,255,255,1.0)!important;' : 'rgba(255,255,255,0.7);'};
    cursor:${props => props.selected ? 'initial' : 'pointer'};
`;

export default class Breadcrumb extends Component {
    render() {
        return(
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    { 
                        this.props.stages.map((stage, index) => {
                            if(index === this.props.selected){
                                return <li className="breadcrumb-item active" aria-current="page"><Translate id={stage}/></li>
                            }
                            else{
                                return <li className="breadcrumb-item"><a href="#"><Translate id={stage}/></a></li>
                            }

                            
                        })
                    }
                </ol>
                </nav>  
        )
        // return (
        //     <nav>
        //         <div className="nav-wrapper teal lighten-3">
        //         <BreadCrumbContainer className="col s12">
        //             { 
        //                 this.props.stages.map((stage, index) => {
        //                     return <BreadButton key={index} selected={index === this.props.selected} onClick={() => this.props.callBack(index)} className="breadcrumb " ><Translate id={stage}/></BreadButton>                            
        //                 })
        //             }
        //         </BreadCrumbContainer>
        //         </div>
        //     </nav>
        // );
    }
}
Breadcrumb.propTypes = {
    stages: PropTypes.array,
    selected:PropTypes.number,
    callBack:PropTypes.func
}