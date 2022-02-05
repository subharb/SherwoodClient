import { Grid, Typography } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { useState } from "react"
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux"
import { ButtonEdit, FieldWrapper } from "../mini_components"
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { EDDType } from "."

interface Props extends LocalizeContextProps {
    error:boolean,
    elementSelected:(edd:EDDType) => void
}

const EDDField:React.FC<Props> = (props) => {
    const [eddDate, setEDDate] = useState<Date | null>(null);

    function handleDateChange(value:MaterialUiPickersDate){
        if(value !== null){
            let cloneDate = new Date(value.valueOf());
            cloneDate.setDate(cloneDate.getDate() + 280);
            setEDDate(cloneDate);
            const eddElement:EDDType = {edd:cloneDate.getTime().toString(), edd_last_period : value.getTime().toString()};
            props.elementSelected(eddElement);
        }
        
    }
    function editDate(){
        setEDDate(null)
    }
    const labelString = props.translate("hospital.edd-title").toString();
    return(
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="body2" component="span"><Translate id="hospital.edd"></Translate></Typography>
        </Grid>
        {
            !eddDate &&
            <Grid item xs={12}>
                <FieldWrapper noWrap = {true}>
                    <MuiPickersUtilsProvider key="date" utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        fullWidth
                            disableToolbar
                            
                            id="date"
                            inputVariant="outlined"
                            
                            label={eddDate ? "" : labelString}
                            format="dd/MM/yyyy"
                            
                            value={eddDate}
                            defaultValue={eddDate} 
                            onChange={(date: MaterialUiPickersDate, value?: string | null | undefined) => handleDateChange(date)}
                            //onKeyDown={(e) => this.handleDateChange(e.target.value)}
                            maxDate={new Date()}
                            emptyLabel={labelString}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FieldWrapper>
            </Grid>
        }
        {
            eddDate &&
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="span">Result : {eddDate.toLocaleDateString()}</Typography>
                    <ButtonEdit onClick={editDate} ><Translate id="general.edit" /></ButtonEdit>
                </Grid>
            </Grid>
        }
    </Grid>
    )
}

export default withLocalize(EDDField);