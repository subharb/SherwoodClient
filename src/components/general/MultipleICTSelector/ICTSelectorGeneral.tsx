import React from 'react'
import ICTSelectorFR  from './ICTSelectorFR'
import ICTSelectorOMS from './ICTSelectorOMS'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { Smartfield } from '.';
import { PropTypes } from '@material-ui/core';

export interface PropsIct{
    //value:Diagnosis[] | false;
    error:boolean,
    type:string,
    //margin:string,
    variant:"standard" | "filled" | "outlined" | undefined,
    size:string,
    language:string,
    typeMargin:PropTypes.Margin | undefined,
    elementSelected: (element:Smartfield) => void,
    cancel: () => void
}

export const ICTSelectorGeneral:React.FC<PropsIct> = (props) => {
    if(["ean", "es", "ar"].indexOf(props.language) !== -1 ){
        return <ICTSelectorOMS type={props.type}  variant="outlined" margin={props.typeMargin} 
            cancel={props.cancel} language={props.language}
            size="small" elementSelected={props.elementSelected} />
    }
    else{
        return <ICTSelectorFR type={props.type} variant="outlined" language={props.language}
                    cancel={props.cancel} size="small" error={props.error}  typeMargin={props.typeMargin} 
                    elementSelected={props.elementSelected} />
    }
    
}
