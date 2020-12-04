export interface CarteleraResponse {
    page:          number;
    total_results: number;
    dates:         Dates;
    total_pages:   number;
    results:       Movie[];
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Movie {
    video:             boolean;
    vote_average:      number;
    popularity:        number;
    overview:          string;
    release_date:      Date;
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    genre_ids:         number[];
    vote_count:        number;
    original_language: string;
    title:             string;
    poster_path:       string;
    original_title:    string;
}

export interface Genre {
    id:   number;
    name: string;
}
