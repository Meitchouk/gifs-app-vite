import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBoxComponentProps {
    onSearch: (query: string) => void;
}

/**
 * SearchBoxComponent is a functional component that renders a search box with an input field and a search button.
 * It allows users to enter a search query and trigger a search action.
 *
 * @component
 * @param {SearchBoxComponentProps} props - The props for the SearchBoxComponent.
 * @param {function} props.onSearch - The callback function to be called when the search button is clicked.
 *
 * @returns {JSX.Element} The rendered search box component.
 *
 * @example
 * <SearchBoxComponent onSearch={(query) => console.log(query)} />
 */
export const SearchBoxComponent = ({ onSearch }: SearchBoxComponentProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            console.warn("El campo de búsqueda está vacío.");
            return;
        }
        onSearch(searchQuery);
        setSearchQuery("");
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
