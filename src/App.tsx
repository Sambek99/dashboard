import { useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const dataFetcherOutput = DataFetcher(selectedCity);

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
            <SelectorUI selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
          </Grid>
        </Grid>
      </Grid>

      {/* Grid inferior: Resto de los elementos */}
      <Grid>
        <Grid container spacing={5} justifyContent="flex-end" alignItems="center">
          {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9 }}>
            {/* Renderizado condicional de los datos obtenidos */}
            {selectedCity && dataFetcherOutput.loading && <p>Cargando datos...</p>}
            {selectedCity && dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
            {selectedCity && dataFetcherOutput.data && (
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
          <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <ChartUI
              selectedCity={selectedCity}
              data={dataFetcherOutput.data}
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
            />
          </Grid>

          {/* Tabla */}
          <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <TableUI
              selectedCity={selectedCity}
              data={dataFetcherOutput.data}
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
            />

          </Grid>

          {/* Información adicional */}
          <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Información adicional
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
