import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react"
import ReactDOMServer from 'react-dom/server';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import { HeaderDocument } from "./header";
import SaveIcon from '@mui/icons-material/Save';
import { BillingInfo } from "../Billing/types";
import { callAddFont } from "./Montserrat-Regular-normal";

interface Props{
    size:"A4" | "ticket",
    name:string
}


export const Document:React.FC<Props> = (props) => {
    const printRef = React.useRef<HTMLDivElement>(null);
    
    async function savePDF(){
        const element = printRef.current;
        if(element){
            document.title=props.name;
            window.print();
            // var printWindow = window.open('', '', 'height=400,width=800');
            // if(printWindow){
            //     printWindow.document.write('<html><head><title>DIV Contents</title>');
            //     printWindow.document.write('</head><body >');
            //     printWindow.document.write(ReactDOMServer.renderToString(document.getElementById("print").innerHTML));
            //     printWindow.document.write('</body></html>');
            //     printWindow.document.close();
            //     printWindow.print();
            // }
        //     var doc = new jsPDF('p', 'mm', [720, 1018]);
            
            
        //    // Convert HTML to PDF in JavaScript
        //    doc.html(element, {
                
        //         callback: function(doc) {
        //             const pageCount = doc.getNumberOfPages();
        //             doc.setFont("Montserrat-Regular");
        //             for(let i = 1; i <= pageCount; i++) {
        //                 doc.setPage(i);
        //                 const pageSize = doc.internal.pageSize;
        //                 const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        //                 const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

        //                 // const header = `Header for Page ${i}`;
        //                 // doc.setFontSize(12);
        //                 // doc.text(header, pageWidth / 2 - (doc.getTextWidth(header) / 2), 10);

                        
        //                 const footer = `Page ${i} of ${pageCount}`;
        //                 doc.text(footer, pageWidth / 2 - (doc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });

        //             }
        //             doc.save(props.name+".pdf");
        //         },
        //         x: 0,
        //         y: 0,
        //         margin: [100, 0, 100, 60],
        //         autoPaging: 'text',
        //         width: 720, //target width in the PDF document
        //         windowWidth: 900 //window width in CSS pixels
        //     });
        }
        else{
            console.log("No ref")
        }
    }

      
    if(props.size === "A4"){
        return(
            <div style={{overflow:'scroll'}}>
                
                    <Grid item xs={12} style={{textAlign:'right'}}>
                        <button id="button_print" onClick={savePDF}><SaveIcon /></button>
                    </Grid>
                <Grid container xs={12}>
                    <div id="print" ref={printRef} style={{width:'700px', fontFamily: "Montserrat-Regular"}}>
                    <style>
                        {`
                        @media print {
                            #button_print, #close-modal {
                                display:none;
                            }
                            @page { 
                                // size: auto;  
                                // margin: 0mm;                                 
                            }
                        }
                        `}
                    </style>
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
