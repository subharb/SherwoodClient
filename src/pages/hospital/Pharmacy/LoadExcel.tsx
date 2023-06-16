import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { ButtonAccept } from '../../../components/general/mini_components';
import ExcelLab from "../../../img/icons/excel-logo.png";

interface LoadExcelProps {
    callbackExcelReady: (items: string) => void
}

const LoadExcel: React.FC<LoadExcelProps> = ({ callbackExcelReady }) => {
    const [excelFile, setExcelFile] = React.useState<any>(null);

    function onFileSelected(event:any){
        // var tmppath = URL.createObjectURL(event.target.files[0]);
        // console.log(tmppath);
        // setImageSelected(tmppath);

        var fileToLoad = event.target.files[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            if(fileLoadedEvent && fileLoadedEvent.target){
                var srcData = fileLoadedEvent.target.result?.toString(); // <--- data: base64
                if(srcData){
                    setExcelFile(srcData);
                }
            }            
        }
        fileReader.readAsDataURL(fileToLoad);
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Translate id="pages.hospital.pharmacy.inventory.load_excel" />
            </Grid>
            <Grid item xs={12}>
                <input id="fileSelect" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{display:'none'}}  
                    type="file" 
                    onChange={(e) => onFileSelected(e)} />
                <label htmlFor="fileSelect">
                    <IconButton color="primary" aria-label="upload excel" component="span" size="large">
                        <img src={ExcelLab} alt="Excel" width={40} />
                    </IconButton>
                </label>
            </Grid>
            <Grid item xs={12}>
                <ButtonAccept onClick={(excelFile:string) => callbackExcelReady(excelFile)} >Upload!</ButtonAccept>
            </Grid>
        </Grid>
    );
};

export default LoadExcel;
