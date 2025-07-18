//import { useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';

function App() {
  //const [count, setCount] = useState(0);
  const dataFetcherOutput = DataFetcher();

  return (
    <Grid container direction="column" spacing={4}>
      {/* Grid superior: Encabezado, Alertas y Selector */}
      <Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <HeaderUI />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <AlertUI description="No se preveen lluvias" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SelectorUI />
          </Grid>
        </Grid>
      </Grid>

      {/* Grid inferior: Resto de los elementos */}
      <Grid>
        <Grid container spacing={5} justifyContent="flex-end" alignItems="center">
          {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9 }}>
            {/* Renderizado condicional de los datos obtenidos */}
            {dataFetcherOutput.loading && <p>Cargando datos...</p>}
            {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
            {dataFetcherOutput.data && (
              <>
                {/* Indicadores con datos obtenidos */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title='Temperatura (2m)'
                    description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title='Temperatura aparente'
                    description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title='Velocidad del viento'
                    description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <IndicatorUI
                    title='Humedad relativa'
                    description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
                </Grid>
              </>
            )}
          </Grid>

          {/* Gráfico */}
          <Grid size={{ xs: 12, md: 6 }}>
            Elemento: Gráfico
          </Grid>

          {/* Tabla */}
          <Grid sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Tabla
          </Grid>

          {/* Información adicional */}
          <Grid sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Información adicional
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
