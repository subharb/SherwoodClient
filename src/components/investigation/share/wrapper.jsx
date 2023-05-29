import React from 'react'
import { useParams
} from "react-router-dom";
import ShareInvestigation from './index';

export default function ShareInvestigationRouter() {
    let { uuid } = useParams();
    return (<ShareInvestigation uuid={uuid} />)
}
