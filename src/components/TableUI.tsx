import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'hora', headerName: 'Hora', width: 150 },
  { field: 'temperatura', headerName: 'Temperatura (°C)', width: 180 },
  { field: 'viento', headerName: 'Viento (km/h)', width: 150 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    sortable: false,
    hideable: false,
    width: 250,
    valueGetter: (_, row) =>
      `A las ${row.hora}, ${row.temperatura}°C, viento: ${row.viento} km/h`,
  },
];

export default function TableUI({ data, loading, error }: TableUIProps) {
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.hourly?.time) return <p>No hay datos</p>;
  
  const horas = data.hourly.time.slice(0, 30);
  const temps = data.hourly.temperature_2m.slice(0, 30);
  const viento = data.hourly.wind_speed_10m?.slice(0, 30) || [];

  const rows = horas.map((hora, index) => ({
    id: index,
    hora,
    temperatura: temps[index],
    viento: viento[index],
  }));

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
