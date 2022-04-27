import { IGenresDataProps } from "./interfaces/landingTypes";

export const getGenreLabels = (IDs: any,  genresData: IGenresDataProps[]) => {
    let filterGenres = []    
    filterGenres = genresData.filter((item)=> {
        return IDs.includes(item.id);
    })
    return filterGenres;
}