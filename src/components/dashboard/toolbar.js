import React, { Component } from 'react'
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
    max-width:20rem;
    xwidth:4rem;
`;
const SpanFunc = styled.span`
    cursor:pointer;
    color:#000;
`;
const Icon = styled.i`
    color:${props => props.selected ? props.theme.colorSherwood : '#000'}
`;

const CustomLink = styled(Link)`
    color:${props => props.selected ? props.theme.colorSherwood : '#000'}
`;

class Toolbar extends Component {
    constructor(props){
        super(props);

        this.state = {selected:null}
    }
    componentDidMount(){
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    }
    selected(index){
        this.setState({selected:index});
    }
    render() {
        if(localStorage.getItem("type") === "researcher"){
            return (
                <div className="col s3">
                    <Container>
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header"><Icon selected = {this.state.selected === 0} className="material-icons">biotech</Icon><CustomLink selected = {this.state.selected === 0} onClick={ () => this.selected(0)} to="/investigation/create"><Translate id="dashboard.create_investigation" /></CustomLink></div>
                                
                            </li>
                            <li>
                                <div className="collapsible-header"><Icon selected = {this.state.selected === 1} className="material-icons">file_copy</Icon><CustomLink selected = {this.state.selected === 1} onClick={() => this.selected(1)} to="/investigation/draft"><Translate id="dashboard.draft_investigations" /></CustomLink></div>
                                
                            </li>
                            <li>
                                <div className="collapsible-header"><Icon selected = {this.state.selected === 2} className="material-icons">whatshot</Icon><CustomLink selected = {this.state.selected === 2} onClick={() => this.selected(2)} to="/investigation/live"><Translate id="dashboard.live_investigations" /></CustomLink></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><Icon selected = {this.state.selected === 2} className="material-icons">whatshot</Icon><Link to="/researcher/login">Logout</Link></div>
                            </li>
                        </ul>
                    </Container>
                </div>
            )
        }
        else if(localStorage.getItem("type") === "patient"){
            return (
                <Container>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">biotech</i><Translate id="dashboard.investigation" /></div>
                            <div className="collapsible-body"><Link to="/investigation/pending"><Translate id="dashboard.pending" /></Link></div>
                            <div className="collapsible-body"><SpanFunc><Link to="/investigation/ongoing"><Translate id="dashboard.ongoing" /></Link></SpanFunc></div>
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

export default withRouter(Toolbar);
