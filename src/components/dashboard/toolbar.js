import React, { Component } from 'react'
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

const Container = styled.div`
    max-width:20rem;
`;
const SpanFunc = styled.span`
    cursor:pointer;
`;
export default class Toolbar extends Component {
    componentDidMount(){
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    }
    render() {
        if(localStorage.getItem("type") === "researcher"){
            return (
                <Container>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">biotech</i><Translate id="dashboard.investigation" /></div>
                            <div className="collapsible-body"><Link to="/investigation/create"><Translate id="dashboard.create_investigation" /></Link></div>
                            <div className="collapsible-body"><SpanFunc><Link to="/investigation/show"><Translate id="dashboard.show_investigations" /></Link></SpanFunc></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                    </ul>
                </Container>
            )
        }
        else if(localStorage.getItem("type") === "patient"){
            return (
                <Container>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">biotech</i><Translate id="dashboard.investigation" /></div>
                            <div className="collapsible-body"><Link to="/investigation/pending"><Translate id="dashboard.pending" /></Link></div>
                            <div className="collapsible-body"><SpanFunc><Link to="/investigation/show"><Translate id="dashboard.show_investigations" /></Link></SpanFunc></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                    </ul>
                </Container>
            )
        }
        
    }
}
