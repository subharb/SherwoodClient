import { useState } from "react";
import { RequestStatus } from "../../Service/types";
import { EventProps } from 'react-big-calendar'
import ReactDOM from 'react-dom';
import { Typography } from "@mui/material";

interface MyEvent {
    title: string;
    start: Date;
    end: Date;
    reason?: string;
    notes?: string;
  }

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

export const CustomEvent: React.FC<EventProps<MyEvent>> = ({event}) => {
    const { title, reason, notes } = event;
    const [showTooltip, setShowTooltip] = useState(true);
    const [tooltipPos, setTooltipPos] = useState<{top:number, left:number} | {}>({});

    const enableTooltip = reason || notes;
    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        setTooltipPos({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX + e.target.offsetWidth,
        });
        setShowTooltip(true);
      };
    
      const handleMouseLeave = () => {
        setShowTooltip(false);
      };

    return (
        <>
        <div
            onMouseEnter={enableTooltip ? handleMouseEnter : undefined}
            onMouseLeave={enableTooltip ? handleMouseLeave : undefined}
            style={{ overflow: 'visible', height: '100%', width: '100%' }}
        >
            <span>{title}</span>
            
        </div>
        {showTooltip &&
        ReactDOM.createPortal(
            <div
                className="tooltip"
                style={{
                    position: 'absolute',
                    top: tooltipPos.top,
                    left: tooltipPos.left,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    padding: '5px',
                    width: '300px',
                    zIndex: 1000,
                }}
            >
            {reason && <Typography variant="body2"><b>Motif:</b> {reason}</Typography>}
            {notes && <Typography variant="body2"><b>Notes:</b> {notes}</Typography>}
          </div>,
          document.body
        )}
        </>
    );
  };