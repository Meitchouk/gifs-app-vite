import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBoxComponentProps {
    onSearch: (query: string) => void;
}

export const SearchBoxComponent = ({ onSearch }: SearchBoxComponentProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            console.warn("El campo de búsqueda está vacío.");
            return;
        }
        onSearch(searchQuery);
        setSearchQuery(""); // Limpia el campo de texto después de la búsqueda
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
                Ingresa el Gif que deseas buscar
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                    id="outlined-basic"
                    label="Busca un GIF"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "60%" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    sx={{
                        alignSelf: "center",
                        display: "flex",
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};
