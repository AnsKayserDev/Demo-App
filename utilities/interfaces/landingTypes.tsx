
export interface ILandingScreenStyleProps {
  movieListData?: IMovieListDataProps,
  genresData?: IGenresDataProps[],

}

export interface IGenresDataProps {
  id:number,
  name: string,
}

export interface IMovieListDataProps {
  results?: [],
  listItem? : IMovieListObjectProps,
  genresData?:IGenresDataProps[], 
  activeGenre?: number
}

interface IMovieListObjectProps {
  title?: string,
  original_title?: string,
  original_language?: string,
  release_date?:string,
  genre_ids?: [],
  shows?: [],
  poster_path?: string,
  id?: number
}

