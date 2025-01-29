import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    Pagination,
} from "@mui/material";

export interface Gif {
    id: string;
    title: string;
    images: {
        fixed_height: {
            height: string;
            url: string;
        };
    };
}

interface GifsListProps {
    gifs: Gif[];
    totalResults: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const GifsList = ({
    gifs,
    totalResults,
    itemsPerPage,
    onPageChange,
}: GifsListProps) => {
    const [page, setPage] = useState(1);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onPageChange(value); // Notifica el cambio de página al componente padre.
    };

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 2,
                    p: 2,
                }}
            >
                {gifs.map((gif) => (
                    <Card key={gif.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height={gif.images.fixed_height.height}
                                image={gif.images.fixed_height.url}
                                alt={gif.title}
                                sx={{
                                    objectFit: "cover",
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    noWrap
                                    sx={{ fontWeight: 500 }}
                                >
                                    {gif.title || "Sin título"}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Pagination
                    count={Math.ceil(totalResults / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    );
};
