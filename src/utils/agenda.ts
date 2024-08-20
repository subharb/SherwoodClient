import { IOutpatientsParams } from "../constants/types";
import { RequestStatus } from "../pages/hospital/Service/types";

export function canCancelAppointment(appointmentDate:Date, appointmentStatus:RequestStatus, outpatientsInfo:IOutpatientsParams): boolean {
    if(outpatientsInfo.type === "date"){
        const isTodayOrFutureDate = (appointmentDate > new Date() || appointmentDate.toDateString() === new Date().toDateString());
        console.log("isTodayOrFutureDate", isTodayOrFutureDate);
        return isTodayOrFutureDate && (appointmentStatus !== RequestStatus.ACCEPTED && appointmentStatus !== RequestStatus.CANCELED);
    }
    else if(outpatientsInfo.type === "date_time"){
        return appointmentDate > new Date() && appointmentStatus !== RequestStatus.ACCEPTED;
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