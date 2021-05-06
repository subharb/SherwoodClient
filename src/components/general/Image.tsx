import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, {SyntheticEvent, useState} from 'react'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';



interface Props extends LocalizeContextProps{

}
const Image:React.FC<Props> = (props) => {
    const [testSelected, setTestSelected] = useState<string | null>(null);
    const [errorTest, setErrorTest] = useState(false);
    const typeTests = ["eco-ab", "scan"];
    
    const optionsArray = typeTests.map(test => {
        return <MenuItem value={test}><Translate id={`hospital.type-test.${test}`} /></MenuItem>
    })
    function selectType(event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>){
        console.log(event);
        if(event){
            const type = event.currentTarget!.dataset.value as string;
            setTestSelected(type);
        }   
    }
    return (
        <div>
            <Grid container>
                <Grid item>
                    <FormControl variant="outlined" margin="dense" style={{width:"235px"}} error={errorTest} >
                        <InputLabel id="test-type"><Translate id="hospital.select-test" /></InputLabel>
                        <Select onChange={(event) => selectType(event)}
                        labelId="test-type"
                        id="test-type"
                        label={<Translate id="hospital.select-test" />}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default withLocalize(Image);