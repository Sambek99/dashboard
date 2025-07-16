import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//import { useState } from 'react';

interface SelectorUIProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export default function SelectorUI({ selectedCity, setSelectedCity }: SelectorUIProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedCity(event.target.value);
    };

    return (
    <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={selectedCity}
            onChange={handleChange}
            
        >
            <MenuItem disabled value=""><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
        </Select>
        <p>
            Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{selectedCity}</span>
        </p>
    </FormControl>
    );
}
