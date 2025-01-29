import { Box, Typography } from "@mui/material";

interface GifsHistoryProps {
    history: string[];
}

/**
 * GifsHistory component displays a list of previously searched GIFs.
 * If the history is empty, it shows a message indicating no recent searches.
 *
 * @component
 * @param {GifsHistoryProps} props - The props for the component.
 * @param {string[]} props.history - An array of strings representing the search history.
 * @returns {JSX.Element} The rendered component.
 */
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
