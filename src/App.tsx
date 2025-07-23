import { useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import AssistantUI from './components/AssistantUI';

function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const dataFetcherOutput = DataFetcher(selectedCity);

  return (
    <Box sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>


          {/* Encabezado, alerta y selector */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <HeaderUI />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <AlertUI description="No se preveen lluvias" />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <SelectorUI selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
            </Paper>
          </Grid>

          {/* Indicadores */}
          {selectedCity && dataFetcherOutput.data && (
            <>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Temperatura (2m)'
                  description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Temperatura aparente'
                  description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Velocidad del viento'
                  description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Humedad relativa'
                  description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m}
                />
              </Grid>
            </>
          )}

          {/* Gráfico */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mt: 2 }}>
              
              <ChartUI
                data={dataFetcherOutput.data}
                loading={dataFetcherOutput.loading}
                error={dataFetcherOutput.error}
              />
            </Card>
          </Grid>

          {/* Tabla */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Detalles por hora
              </Typography>
              <TableUI
                data={dataFetcherOutput.data}
                loading={dataFetcherOutput.loading}
                error={dataFetcherOutput.error}
              />
            </Card>
          </Grid>

          {/* Asistente del clima */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mt: 2 }}>
              <AssistantUI />
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default App;
