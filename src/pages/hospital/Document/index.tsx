import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react"

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import { HeaderDocument } from "./header";
import SaveIcon from '@mui/icons-material/Save';
import { BillingInfo } from "../Billing/types";

interface Props{
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

            // const canvas = await html2canvas(element, {
            //     useCORS: true
            // });
            // const data = canvas.toDataURL('image/png');

            // const pdf = new jsPDF();
            // const imgProperties = pdf.getImageProperties(data);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight =
            // (imgProperties.height * pdfWidth) / imgProperties.width;

            // pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
            // pdf.save(props.name+'.pdf');

            // const elemntToPrint = document.getElementById("print");
            // if(elemntToPrint){
            //     htmlToImage.toPng(elemntToPrint)
            //     .then(function (dataUrl) {
            //         saveAs(dataUrl, 'my-node.png');
            //     });

            
            var doc = new jsPDF('p', 'mm', [720, 1018]);


            // const head = [['ID', 'Country', 'Index', 'Capital']]
            // const data = [
            //     [1, 'Finland', 7.632, 'Helsinki'],
            //     [2, 'Norway', 7.594, 'Oslo'],
            //     [3, 'Denmark', 7.555, 'Copenhagen'],
            //     [4, 'Iceland', 7.495, 'Reykjavík'],
            //     [5, 'Switzerland', 7.487, 'Bern'],
            //     [9, 'Sweden', 7.314, 'Stockholm'],
            //     [73, 'Belarus', 5.483, 'Minsk'],
            // ]
        
            // doc.autoTable(head, data, {
            //     startY: doc.autoTable() + 70,
            //     margin: { horizontal: 10 },
            //     styles: { overflow: "linebreak" },
            //     bodyStyles: { valign: "top" },
            //     columnStyles: { email: { columnWidth: "wrap" } },
            //     theme: "striped",
            //     showHead: "everyPage"
            //   });

           // Convert HTML to PDF in JavaScript
           doc.html(element, {
                callback: function(doc) {
                    const pageCount = doc.getNumberOfPages();
                    for(let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        const pageSize = doc.internal.pageSize;
                        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                        const footer = `Page ${i} of ${pageCount}`;
                        doc.text(footer, pageWidth / 2 - (doc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });

                    }
                    doc.save(props.name+".pdf");
                },
                x: 0,
                y: 0,
                margin: [100, 0, 100, 60],
                autoPaging: 'text',
                width: 870, //target width in the PDF document
                windowWidth: 1000 //window width in CSS pixels
            });



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
                        {
                            props.children
                        }
                    </div>
                </Grid>
            </div>
        )
    }
    else{
        return null;
    }
}
