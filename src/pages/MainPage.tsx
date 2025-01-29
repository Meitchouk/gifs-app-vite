import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { GifsList } from "../components/GifsList";
import { getGifs } from "../api/api";
import { SearchBoxComponent } from "../components/searchBox";
import { Sidebar } from "../components/sidebar";
import { Gif } from "../types/interfaces";


/**
 * MainPage component that displays a list of GIFs based on a search query.
 * It includes a search box, a sidebar with search history, and a paginated list of GIFs.
 *
 * @component
 * @example
 * return (
 *   <MainPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the following hooks:
 * - `useState` to manage the state of GIFs, loading status, total results, current page, search query, and search history.
 * - `useEffect` to fetch GIFs whenever the search query or page number changes.
 *
 * @function
 * @name MainPage
 *
 * @typedef {Object} Gif
 * @property {string} id - The unique identifier for the GIF.
 * @property {string} url - The URL of the GIF.
 * @property {string} title - The title of the GIF.
 *
 * @param {string} searchQuery - The current search query.
 * @param {number} page - The current page number.
 * @param {boolean} loading - The loading status.
 * @param {Gif[]} gifs - The list of GIFs.
 * @param {number} totalResults - The total number of results for the search query.
 * @param {string[]} history - The search history.
 * @param {number} itemsPerPage - The number of items to display per page.
 *
 * @method fetchGifs
 * Fetches GIFs based on the search query and page number.
 * @param {string} query - The search query.
 * @param {number} pageNumber - The page number.
 *
 * @method handleSearch
 * Handles the search action from the search box and updates the search history.
 * @param {string} query - The search query.
 *
 * @method handleClearHistory
 * Clears the search history.
 */
export const MainPage = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);

    const itemsPerPage = 50;

    useEffect(() => {
        fetchGifs(searchQuery, page);
    }, [searchQuery, page]);

    const fetchGifs = async (query: string, pageNumber: number) => {
        setLoading(true);
        try {
            const response = await getGifs(query, itemsPerPage, (pageNumber - 1) * itemsPerPage);
            setGifs(response.data);
            setTotalResults(response.pagination.total_count);
        } catch (error) {
            console.error("Error cargando los GIFs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Maneja la búsqueda desde el SearchBox y el historial
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1);

        // Agregar al historial si no existe ya, manteniendo un máximo de 10 elementos
        setHistory((prevHistory) => {
            const newHistory = [query, ...prevHistory.filter(item => item !== query)].slice(0, 10);
            return newHistory;
        });
    };

    // Borra el historial de búsqueda
    const handleClearHistory = () => {
        setHistory([]);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar history={history} onSearch={handleSearch} onClearHistory={handleClearHistory} />

            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: "300px",
                    padding: 2,
                    paddingLeft: 8,
                    overflow: "hidden",
                }}
            >
                <SearchBoxComponent onSearch={handleSearch} />

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <GifsList
                        gifs={gifs}
                        totalResults={totalResults}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                    />
                )}
            </Box>
        </Box>
    );
}
