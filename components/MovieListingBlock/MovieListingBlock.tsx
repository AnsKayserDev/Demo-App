import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';


import styles from './MovieListingBlock.module.scss';
import { ILandingScreenStyleProps } from '../../utilities/interfaces/landingTypes';
import Thumbnail from '../shared/Thumbnail/Thumbnail';
import { useDispatch } from 'react-redux';
import { SET_SOURCE_MOVIE_DATA } from '../../store/actions/types';

export default function MovieListingBlock(props: ILandingScreenStyleProps) {
	const {
		movieListData,
		genresData,
	} = props;
	const dispatch = useDispatch();
	const [activeGenre, setActiveGenre] = useState(0);
	const handleGenre = (element: any) => {
		setActiveGenre(element.id)
	}
	useEffect(() => {
		dispatch({ type: SET_SOURCE_MOVIE_DATA, payload: movieListData })
		sessionStorage.setItem('movieListSourceData', JSON.stringify(movieListData));
	}, [])
	return (
		<div>
			<div className={`${styles.genreContainer} pl-5 `}>
				<h2>Screening These Days</h2>
				<ul className="nav nav-tabs">
					{genresData?.map((el: any) => {
						return (
							<li key={el.id} className={`nav-item ${styles.navContainer}`}>
								<a onClick={() => handleGenre(el)} className={`nav-link ${activeGenre == el.id ? 'active' : ' '}`} href="#"><strong>{el.name}</strong></a>
							</li>
						)
					})
					}
				</ul>
			</div>
			{movieListData?.results?.map((movieItem) => {
				return (
					<Thumbnail
						listItem={movieItem}
						genresData={genresData}
						activeGenre={activeGenre}
					/>
				)

			})
			}

		</div>
	);
}
