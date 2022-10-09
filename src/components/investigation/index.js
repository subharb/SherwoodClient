import React from 'react'
import UpdateInvestigation from './create/edit';
import ShowInvestigation from './show/single';
import { useParams
} from "react-router-dom";

export default function Investigation(props) {
    let { uuid } = useParams();
    //return <UpdateInvestigation uuid={uuid} {...props} />
    if(props.status === 0){
        return <UpdateInvestigation uuid={uuid} {...props} />
    }
    else{
        return <ShowInvestigation uuid={uuid} {...props} />
    }

}
