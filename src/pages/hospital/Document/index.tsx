import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { HeaderDocument } from "./header";
import SaveIcon from '@material-ui/icons/Save';
import { BillingInfo } from "../Billing/types";
import domtoimage from 'dom-to-image';

interface Props extends Omit<BillingInfo, 'id' | 'billables'>   {
    size:"A4" | "ticket",
    name:string
}
export const Document:React.FC<Props> = (props) => {
    const printRef = React.useRef<HTMLDivElement>(null);
    
    async function savePDF(){
        const element = printRef.current;
        if(element){

            // const element = printRef.current;
            // const canvas = await html2canvas(element, {
            //     useCORS: true
            // });

            // const data = canvas.toDataURL('image/jpg');
            // const link = document.createElement('a');

            // if (typeof link.download === 'string') {
            // link.href = data;
            // link.download = 'image.jpg';

            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // } else {
            // window.open(data);
            // }

            const data = await domtoimage.toPng(element);
            const canvas = await html2canvas(element, {
                useCORS: true
            });
            console.log(canvas.outerHTML);
            // const data = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            const imgProperties = pdf.getImageProperties(data);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

            pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(props.name+'.pdf');

            // const elemntToPrint = document.getElementById("print");
            // if(elemntToPrint){
            //     htmlToImage.toPng(elemntToPrint)
            //     .then(function (dataUrl) {
            //         saveAs(dataUrl, 'my-node.png');
            //     });
                
            // }
            
        }
        else{
            console.log("No ref")
        }
    }
    if(props.size === "A4"){
        return(
            <div style={{overflow:'scroll'}}>
                
                <Grid item xs={12} style={{textAlign:'right'}}>
                    <button onClick={savePDF}><SaveIcon /></button>
                </Grid>
                <Grid container xs={12}>
                    <div id="print" ref={printRef} style={{width:'700px', padding:'1rem'}}>
                        <HeaderDocument size={props.size} hospitalName={props.hospitalName} logoBlob={props.logoBlob} currency={props.currency}
                            phone={props.phone} address={props.address} email={props.email} 
                            />
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        {
                            props.children
                        }
                        </Grid>   
                    </div>
                </Grid>
            </div>
        )
    }
    else{
        return null;
    }
}
