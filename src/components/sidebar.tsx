import { Box, Button, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface SidebarProps {
    history: string[]; // Recibe el historial desde `App.tsx`
    onSearch: (query: string) => void;
    onClearHistory: () => void;
}

export const Sidebar = ({ history, onSearch, onClearHistory }: SidebarProps) => {
    return (
        <Box
            sx={{
                width: 300,
                height: "98vh",
                position: "fixed",
                top: 0,
                left: 0,
                bgcolor: "background.paper",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                borderRight: "1px solid #e0e0e0",
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="text.primary">
                Gifs App - Vite
            </Typography>

            {/* Lista de historial */}
            <List>
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => onSearch(item)}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
                        No hay historial de búsqueda
                    </Typography>
                )}
            </List>

            {/* Botón para limpiar el historial */}
            <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<DeleteIcon />}
                sx={{
                    alignSelf: "center",
                    mt: "auto",
                    mb: 2,
                }}
                onClick={onClearHistory}
            >
                Clear
            </Button>
        </Box>
    );
};
