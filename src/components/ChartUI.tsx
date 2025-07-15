import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import DataFetcher from '../functions/DataFetcher';

export default function ChartUI() {
   const { data, loading, error } = DataFetcher();

   if (loading) return <p>Cargando gráfico...</p>;
   if (error) return <p>Error: {error}</p>;
   if (!data?.hourly?.time) return <p>No hay datos</p>;

   const horas = data.hourly.time.slice(0, 7);
   const temps = data.hourly.temperature_2m.slice(0, 7);
   const viento = data.hourly.wind_speed_10m?.slice(0, 7) ?? Array(7).fill(0);


   return (
      <>
         <Typography variant="h5" component="div" gutterBottom>
            Temperatura y viento por hora
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temps, label: 'Temperatura (°C)' },
               { data: viento, label: 'Viento (km/h)' }
            ]}
            xAxis={[{ scaleType: 'point', data: horas }]}
         />
      </>
   );
}
