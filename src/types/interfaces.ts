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