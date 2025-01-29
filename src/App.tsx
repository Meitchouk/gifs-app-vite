import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { SearchBoxComponent } from "./components/searchBox";
import { Sidebar } from "./components/sidebar";
import { GifsList, Gif } from "./components/GifsList";
import { getGifs } from "./api/api";

function App() {
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

export default App;
