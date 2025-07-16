import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
//import DataFetcher from '../functions/DataFetcher';

interface ChartUIProps {
  selectedCity: string; 
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function ChartUI({ selectedCity, data, loading, error }: ChartUIProps) {
  //if (!selectedCity) return null;   //Si se lo activa no aparecerá la tabla ya que no hay una ciudad seleccionada
  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.hourly?.time) return <p>No hay datos</p>;

  const horas = data.hourly.time.slice(0, 30);
  const temps = data.hourly.temperature_2m.slice(0, 30);
  const viento = data.hourly.wind_speed_10m?.slice(0, 30) || [];

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Temperatura y viento por hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: temps, label: 'Temperatura (°C)' },
          { data: viento, label: 'Viento (km/h)' },
        ]}
        xAxis={[{ scaleType: 'point', data: horas }]}
      />
    </>
  );
}
