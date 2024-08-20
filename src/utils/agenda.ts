import { IOutpatientsParams } from "../constants/types";
import { RequestStatus } from "../pages/hospital/Service/types";

export function canCancelAppointment(appointmentDate:Date, appointmentStatus:RequestStatus, outpatientsInfo:IOutpatientsParams): boolean {
    if(outpatientsInfo.type === "date"){
        return appointmentDate.toDateString() === new Date().toDateString() && appointmentStatus !== RequestStatus.ACCEPTED;
    }
    else if(outpatientsInfo.type === "date_time"){
        return appointmentDate > new Date() && appointmentStatus !== RequestStatus.ACCEPTED;
    }
    return false;
}