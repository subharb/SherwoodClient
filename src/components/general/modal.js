import React, {Component} from 'react';
import styled from 'styled-components';
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from 'prop-types'; 

const ModalContainer = styled.div`
    display:none;
    max-height: 90%;
`;
const CloseButton = styled.button`
    position: absolute;
    bottom: 1.3rem;
    right: 1rem;
`;
export default class Modal extends Component{
    constructor(props){
        super(props);
        this.instance = null;
        this.modal = React.createRef();
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
        console.log("Modal componentDidUpdate");
        if(this.props.open === true && !this.instance.isOpen){
            console.log("Abrimos");
            this.instance.open();
        }
        else if(this.props.open === false && this.instance.isOpen){
            console.log("Cerramos");
            this.instance.close();
        }
    }
    render(){
        console.log("Modal render");
        if(this.props.open){
            return (
                <div ref={this.modal}  id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>{this.props.title}</h4>
                        {this.props.component}
                        <CloseButton data-testid="cancel" onClick={this.props.closeCallBack} className="waves-effect waves-light btn red lighten-1">Cancel</CloseButton>
                    </div>
                    
                </div> 
            );
        }
        else{
            return(
                <div ref={this.modal}  id="modal1" className="modal">
                    <div className="modal-content">
                        
                    </div>
                </div> 
            );
        }
        
    }
    static propTypes = {
        open: PropTypes.bool
    }
}


