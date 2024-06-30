
import React from 'react';
import AnimatedCheckGif from '../../img/animatedCheck.gif';

interface AnimatedCheckProps { 
     
}


const AnimatedCheck: React.FC<AnimatedCheckProps> = ({  }) => {
    return (
        <img src={AnimatedCheckGif} width="100" alt="Success!" />
    );
};

export default AnimatedCheck;
