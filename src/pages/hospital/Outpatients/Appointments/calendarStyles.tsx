import { RequestStatus } from "../../Service/types";

export const eventStyleGetter = (event) => {
    let backgroundColor = '';

    // Set color based on event type or other criteria
    switch (event.type) {
      case RequestStatus.ACCEPTED:
        backgroundColor = '#32cd32'; // LimeGreen
        break;
      case RequestStatus.PENDING_PAYMENT:
        backgroundColor = '#ff7f50'; // Coral
        break;
      case RequestStatus.PENDING_APPROVAL:
        backgroundColor = '#1e90ff'; // DodgerBlue
        break;
      default:
        backgroundColor = '#d3d3d3'; // LightGray for default/other events
        break;
    }

    const style = {
      backgroundColor,
      borderRadius: '5px',
      border: 'none',
      color: 'white',
      display: 'block',
    };

    return {
      style,
    };
  };