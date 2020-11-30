import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
    padding:1rem;
`;


export default function CardInvestigation(props) {
    function renderStatus(status){
        if(typeof status !== "undefined"){
            switch(status){
                case 0: return <i className="material-icons" alt="draft">file_copy</i>
                case 1: return <i className="material-icons" alt="live">whatshot</i>
                default: return null;
            }
        }
        else{
            return null;
        }
    }
    return (
        <CardContainer>
            <div class="card" style={{width: '18rem'}}>
            <div class="card-body">
                
                <h5 class="card-title">{ renderStatus(props.status)}{props.title}</h5>
                <p class="card-text">{props.description}</p>
                <Link to={props.url} class="btn btn-primary">{props.textUrl}</Link>
            </div>
            </div>
        </CardContainer>
    )
}
