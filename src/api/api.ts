import axios from "axios";
import { Gif } from "../components/GifsList";

// Leer variables de entorno
const BASE_URL = import.meta.env.VITE_GIPHY_URL;
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

// Validar que las variables de entorno no sean undefined o vacías
if (!BASE_URL || !API_KEY) {
    throw new Error(
        "Faltan las variables de entorno: asegúrate de que VITE_GIPHY_URL y VITE_GIPHY_API_KEY están configuradas correctamente."
    );
}

export const getGifs = async (
    search: string,
    limit: number = 10,
    offset: number = 0
): Promise<{ data: Gif[]; pagination: { total_count: number } }> => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                api_key: API_KEY,
                q: search,
                limit: limit,
                offset: offset,
            },
        });

        // console.log("Response data:", response.data);

        const { data, pagination } = response.data || {};
        if (Array.isArray(data) && pagination?.total_count !== undefined) {
            return { data, pagination };
        } else {
            console.error("Estructura de respuesta inesperada:", response.data);
            throw new Error("Datos de respuesta mal formateados");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error obteniendo GIFs:", error.message);
        } else {
            console.error("Error obteniendo GIFs:", error);
        }
        return { data: [], pagination: { total_count: 0 } };
    }
};
