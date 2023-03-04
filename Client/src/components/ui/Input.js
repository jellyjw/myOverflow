import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
export default function Input({type,name,value,onChange}) {
    return (
        <Grid item xs={12}> 
        <TextField
                  required
                  fullWidth
                  type={type}
                  id={type}
                  label={type}
                  name={name === 'password_confirm' ? 'password_confirm': name}
                 className='textField-radius'
                 autoComplete={type}
                 value={value}
                 onChange={onChange}
        />      
        {/* <div className='text-gray-700 text-center font-thin text-sm'>{name} 형식이 제대로 됐는지 확인해주세요</div> */}
        </Grid>   
    );
}

