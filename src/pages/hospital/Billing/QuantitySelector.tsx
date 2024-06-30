import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CSSProperties, makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display:'flex', 
        flexDirection:'row',
    },
    quantityHolder:{
        display:'flex', alignItems:'center', padding:'0.5rem', minWidth:'0.5rem'
    },
    selectorsHolder:{
        display:'flex', flexDirection:'column', justifyContent: 'center', width:'1.5rem'
    },
    button:{
        height: 25,
        fontSize: '0.5rem',
    },
    icon:{
        fontSize: '1.5rem!important',
        backgroundColor: theme.buttonContinue.primary.background,
        borderRadius:'50%',
        color: theme.buttonContinue.primary.color,
        
    }
  }));

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    onQuantityChange(newQuantity);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.quantityHolder}>
        <Typography> {quantity}</Typography></div>
      <div className={classes.selectorsHolder}>
        <IconButton onClick={handleIncrement} className={classes.button}>
            <AddIcon className={classes.icon} />
        </IconButton>
        <IconButton onClick={handleDecrement} className={classes.button}>
            <RemoveIcon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default QuantitySelector;
