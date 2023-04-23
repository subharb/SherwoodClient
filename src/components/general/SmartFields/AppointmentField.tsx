import { Card, CardContent, IconButton } from '@material-ui/core';
import React from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { IAppointment, IDepartment } from '../../../constants/types';
import { FormMakeAppointment } from '../../../pages/hospital/Outpatients/FormAppointment';
import { cancelAppointmentService } from '../../../services/agenda';
import { stringDatePostgresToDate } from '../../../utils';
import Loader from '../../Loader';
import { IconGenerator } from '../mini_components';

interface AppointmentFieldProps extends LocalizeContextProps{
    uuidPatient: string;
    uuidInvestigation: string;
    value:string;
    label:string;
    department:IDepartment;
    appointmentSelected:(date:number | null) => void
}

const AppointmentField: React.FC<AppointmentFieldProps> = ({ label,  uuidPatient, value, department, activeLanguage, uuidInvestigation, appointmentSelected }) => {
    const [appointment, setAppointment] = React.useState<IAppointment | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    function appointmentMadeCallback(appointment:IAppointment) {
        setAppointment(appointment);
        appointmentSelected(appointment.startDateTime);
    }

    function deleteAppointment(){
        if(appointment){
            setLoading(true);
            cancelAppointmentService(uuidInvestigation, appointment.uuid)
                .then(response => {
                    setLoading(false);
                    appointmentSelected(null);
                })
                .catch(err => {
                    setLoading(false);
                })
        }
    }

    function renderContent(){
        if(loading){
            return <Loader />
        }
        if(value){
            const date = stringDatePostgresToDate(value);
            return(
                <>
                    { label }: {date.toLocaleDateString(activeLanguage.code, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    { appointment && 
                        <IconButton 
                            onClick={(e) => {
                                deleteAppointment();
                                e.stopPropagation();
                            }}>
                            
                            <IconGenerator type="delete" />
                        </IconButton>   
                    }
                </>
            )
        }
        return (
            <>
                <FormMakeAppointment uuidPatient={uuidPatient} 
                    uuidInvestigation={uuidInvestigation} showAllAgendas={false}
                    hidePatientInfo={true} department={department}
                    appointmentMadeCallback={(date) => appointmentMadeCallback(date)} />
            </>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent>
                { renderContent()}
            </CardContent>
        </Card>
    )
    
};

export default withLocalize(AppointmentField);
