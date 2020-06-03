import React, {useEffect, Component} from 'react';
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

        this.instance = null;
    }
    componentDidMount(){
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
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        //instances[0].open();
        this.instance = instances[0];
            // instance.close();
            // instance.destroy();
    }
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.open === true){
            this.instance.open();
        }
        else{
            this.instance.close();
        }
    }
    render(){
        return (
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>{this.props.title}</h4>
                    {this.props.component}
                </div>
            </div> 
        );
    }
}


