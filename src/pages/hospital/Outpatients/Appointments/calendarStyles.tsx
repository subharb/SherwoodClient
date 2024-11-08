import { useState } from "react";
import { RequestStatus } from "../../Service/types";
import { EventProps } from 'react-big-calendar'
import ReactDOM from 'react-dom';
import { Typography } from "@mui/material";
import { Done, EventBusy, MoneyOff } from "@mui/icons-material";
import { func } from "prop-types";

interface MyEvent {
    title: string;
    start: Date;
    end: Date;
    reason?: string;
    notes?: string;
    overlapCount?:number
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
        case RequestStatus.EXPIRED:
            backgroundColor = '#b22222'; // Tomato
            break;
        case RequestStatus.CANCELED:
            backgroundColor = 'gold'; // Yellow
            break;
        default:
            backgroundColor = '#d3d3d3'; // LightGray for default/other events
            break;
    }

    const style = {
      backgroundColor,
      borderRadius: '5px',
      border: '1px solid white',
      color: 'white',
      display: 'block',
      width: '20%!important', 
      marginLeft: '10px',
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

    function renderIcon(type: RequestStatus) {
        let icon = null;
        switch (type) {
            case RequestStatus.ACCEPTED:
                icon = <Done fontSize="small" />;
                break;
            case RequestStatus.PENDING_PAYMENT:
                icon = <MoneyOff fontSize="small" />;
                break;
            case RequestStatus.EXPIRED:
                icon = <EventBusy fontSize="small" />;
                break;
            default:
                return null;
        }
        return (
            <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                borderRadius: '50%',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
        );
    }
    function capitalizeFirstLetter(string: string): string {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      }

    return (
        <>
        <div
            onMouseEnter={enableTooltip ? handleMouseEnter : undefined}
            onMouseLeave={enableTooltip ? handleMouseLeave : undefined}
            style={{ overflow: 'visible', height: '100%', width: '100%', position: 'relative' }}
        >
            <span>{capitalizeFirstLetter(title)}</span>
            {renderIcon(event.type)}
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
