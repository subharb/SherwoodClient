import { IOutpatientsParams } from "../constants/types";
import { RequestStatus } from "../pages/hospital/Service/types";

export function canCancelAppointment(appointmentDate:Date, appointmentStatus:RequestStatus, outpatientsInfo:IOutpatientsParams): boolean {
    if(outpatientsInfo.type === "date"){
        const isTodayOrFutureDate = (appointmentDate > new Date() || appointmentDate.toDateString() === new Date().toDateString());
        console.log("isTodayOrFutureDate", isTodayOrFutureDate);
        return isTodayOrFutureDate && (appointmentStatus !== RequestStatus.ACCEPTED && appointmentStatus !== RequestStatus.CANCELED);
    }
    else if(outpatientsInfo.type === "date_time"){
        return appointmentDate > new Date() && (appointmentStatus !== RequestStatus.ACCEPTED && appointmentStatus !== RequestStatus.CANCELED);
    }
    return false;
}

export function canShowUpAppointment(appointmentDate:Date, appointmentStatus:RequestStatus, outpatientsInfo:IOutpatientsParams): boolean{
    const isToday = (appointmentDate.toDateString() === new Date().toDateString());
    return isToday && appointmentStatus !== RequestStatus.ACCEPTED;
}

export function isAppointmentDone(status:number){
    return [RequestStatus.ACCEPTED, RequestStatus.COMPLETED].includes(status);
}

export function turnsAgendaDates(turns:number[][]):Date[]{
    const today = new Date();
    const startTurn = new Date(today);
    startTurn.setHours(turns[0][0]);
    startTurn.setMinutes(turns[0][1]);
    const endTurn = new Date(today);
    endTurn.setHours(turns[1][0]);
    endTurn.setMinutes(turns[1][1]);
    return [startTurn, endTurn];

}

export function errorCodesCreateAppointment(error:number){
    const errorTranslationPath = "pages.hospital.outpatients.appointment.error";
    let message = "";
    if(error === 0){
        message = `${errorTranslationPath}.date_time`
    }
    else if(error === 1){
        message = `${errorTranslationPath}.full_agenda`
    }
    else if(error === 2){
        message = `${errorTranslationPath}.date_blocked`
    }
    else if(error === 3){
        message = `${errorTranslationPath}.week_day_not_available`
    }
    else if(error === 4){
        message = `${errorTranslationPath}.outside_agenda_hours`
    }
    else if(error === 5){
        message = `${errorTranslationPath}.conflict_appointment`
    }
    else{
        return "general.error";
    }
    return message;
}

export function requestAppointmentStatusToColor(requestStatus:RequestStatus){
    let color = '';
    switch (requestStatus) {
        case RequestStatus.ACCEPTED:
            color = '#32cd32'; // LimeGreen
            break;
        case RequestStatus.PENDING_PAYMENT:
            color = '#ff7f50'; // Coral
            break;
        case RequestStatus.PENDING_APPROVAL:
            color = '#1e90ff'; // DodgerBlue
            break;
        case RequestStatus.EXPIRED:
            color = '#b22222'; // Tomato
            break;
        case RequestStatus.CANCELED_BY_USER:
            color = 'gold'; // Yellow
            break;
        default:
            color = '#d3d3d3'; // LightGray for default/other events
            break;
    }
    return color;
}