import React from 'react'
import UpdateInvestigation from './create';
import FillInvestigation from './show/single';
import { useParams
} from "react-router-dom";

export default function Investigation(props) {
    let { uuid } = useParams();
    if(props.status === 0){
        return <UpdateInvestigation uuid={uuid} {...props} />
    }
    else{
        return <FillInvestigation uuid={uuid} {...props} />
    }

}
