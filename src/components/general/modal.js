import React, {Component} from 'react';
import styled from 'styled-components';
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from 'prop-types'; 

const ModalContainer = styled.div`
    display:none;
    max-height: 90%;
`;
export default class Modal extends Component{
    constructor(props){
        super(props);
        console.log("Constructor Modal");
        this.instance = null;
        this.modal = React.createRef();
    }
    static propTypes = {
        open: PropTypes.bool
    }
    componentDidMount(){
        console.log("componentDidMount Modal");
        const options = {
            onOpenStart: () => {
              console.log("Open Start");
            },
            onOpenEnd: () => {
              console.log("Open End");
            },
            onCloseStart: () => {
              console.log("Close Start");
            },
            onCloseEnd: () => {
              console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
          };
        this.instance = M.Modal.init(this.modal.current, options);  
    }
    componentDidUpdate(prevProps, nextState) {
        console.log("componentDidUpdate");
        console.log("prevProps", prevProps.open);
        console.log("this.props", this.props.open);
        if(this.props.open === true && !this.instance.isOpen){
            console.log("Abrimos", this.instance);
            this.instance.open();
        }
        else if(this.props.open === false && this.instance.isOpen){
            console.log("Cerramos");
            this.instance.close();
        }
    }
    render(){
        return (
            <div ref={this.modal}  id="modal1" className="modal">
                <div className="modal-content">
                    <h4>{this.props.title}</h4>
                    {this.props.component}
                </div>
            </div> 
        );
    }
}


