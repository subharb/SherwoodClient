import React, {Component} from 'react';
import styled from 'styled-components';
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from 'prop-types'; 

const ModalContent = styled.div`
    text-align:center;
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
    componentWillUnmount(){
        if(this.instance.isOpen){
            this.instance.close();
        }
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
                    <ModalContent className="modal-content">
                        <h5 className="teal-text lighten-1">{this.props.title}</h5>
                        {this.props.component}
                        {this.props.callBackForm &&
                            <button data-testid="cancel" onClick={this.props.callBackForm} className="waves-effect waves-light btn">Continue</button>
                        } 
                        {this.props.closeCallBack &&
                            <CloseButton data-testid="cancel" onClick={this.props.closeCallBack} className="waves-effect waves-light btn red lighten-1">Cancel</CloseButton>
                        }                        
                    </ModalContent>
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
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),
    component:PropTypes.object.isRequired,
    callBackForm:PropTypes.func,
    closeCallBack:PropTypes.func
}
