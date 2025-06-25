import { useState } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid container direction="column" spacing={4}>
      {/* Grid superior: Encabezado, Alertas y Selector */}
      <Grid item>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <HeaderUI />
          </Grid>
          <Grid item xs={12} md={4}>
            <AlertUI description="No se preveen lluvias" />
          </Grid>
            <Grid item xs={12} md={4}>
            <SelectorUI />
            </Grid>
        </Grid>
      </Grid>

      {/* Grid inferior: Resto de los elementos */}
      <Grid item>
        <Grid container spacing={5} justifyContent="flex-end" alignItems="center">
          {/* Indicadores */}
          <Grid item xs={12} md={9}>
            Elemento: Indicadores
          </Grid>

          {/* Gráfico */}
          <Grid item xs={12} md={6}>
            Elemento: Gráfico
          </Grid>

          {/* Tabla */}
          <Grid item sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Tabla
          </Grid>

          {/* Información adicional */}
          <Grid item sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Información adicional
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
