import { Box, Typography } from "@mui/material";

interface GifsHistoryProps {
    history: string[];
}

export const GifsHistory: React.FC<GifsHistoryProps> = ({ history }) => {
    return (
        <Box
            sx={{
                maxHeight: "80vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: 1,
            }}
        >
            {history.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No hay búsquedas recientes.
                </Typography>
            ) : (
                history.map((item, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                        sx={{
                            p: 1,
                            borderBottom: "1px solid #e0e0e0",
                            cursor: "pointer",
                            transition: "background 0.2s ease-in-out",
                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        {item}
                    </Typography>
                ))
            )}

        </Box>
    );
};
