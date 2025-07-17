import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import { getWithExpiry, setWithExpiry } from './storageWithExpiry';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const cityCoordinates: Record<string, { latitude: number; longitude: number }> = {
    guayaquil: { latitude: -2.1962, longitude: -79.8862 },
    quito: { latitude: -0.2299, longitude: -78.5249 },
    manta: { latitude: -0.9677, longitude: -80.7089 },
    cuenca: { latitude: -2.9006, longitude: -79.0045 }
};

export default function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = `weather-${city}`;
        const cached = getWithExpiry(cacheKey);
        const coords = cityCoordinates[city.toLowerCase()];
        if (!coords) {
            setError('Ciudad no encontrada');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m`
                );

                if (!response.ok) throw new Error('Error de red');

                const json = await response.json();
                setData(json);
                setWithExpiry(cacheKey, json, 10); // guarda por 10 minutos
            } catch (err) {
                console.warn('Fallo al obtener datos, intentando usar caché sin vigencia...');
                const fallback = localStorage.getItem(cacheKey);
                if (fallback) {
                    const parsed = JSON.parse(fallback);
                    setData(parsed.value); // usa valor incluso si expiró
                } else {
                    setError('Error al obtener los datos');
                }
            } finally {
                setLoading(false);
            }
        };

        if (cached) {
            setData(cached);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [city]);

    return { data, loading, error };
}
