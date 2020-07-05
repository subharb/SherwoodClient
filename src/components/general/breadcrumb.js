import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BreadButton = styled.button`
    &:last-child {
        color: rgba(255,255,255,0.7);
    }
    background: none;
    border: none;
    line-height: unset;
    color:${props => props.selected ? 'rgba(255,255,255,1.0)!important;' : 'rgba(255,255,255,0.7);'};
    cursor:${props => props.selected ? 'initial' : 'pointer'};
`;

export default class Breadcrumb extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <div className="col s12">
                    { 
                        this.props.stages.map((stage, index) => {
                            return <BreadButton selected={index === this.props.selected} onClick={() => this.props.callBack(index)} className="breadcrumb">{stage}</BreadButton>                            
                        })
                    }
                </div>
                </div>
            </nav>
        );
    }
}
Breadcrumb.propTypes = {
    stages: PropTypes.array,
    selected:PropTypes.number,
    callBack:PropTypes.func
}