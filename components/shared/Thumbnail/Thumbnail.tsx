import { useEffect, useState } from 'react';

import { IMovieListDataProps } from '../../../utilities/interfaces/landingTypes';
import styles from './Thumbnail.module.scss';
import { imageBaseURl } from '../../../utilities/constants';
import { getGenreLabels } from '../../../utilities/common';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_SELECTED_MOVIE } from '../../../store/actions/types';
export default function Thumbnail(props: IMovieListDataProps) {
	const {
		listItem,
		genresData = [],
		activeGenre = 0,
	} = props;
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSelectedEvent = () => {
		dispatch({ type: SET_ACTIVE_SELECTED_MOVIE, payload: listItem })
		router.push(`/movie-details/${listItem?.id}`);
	}

	let genreIDs =  listItem?.genre_ids?.map((el)=> parseInt(el)) || [];
	return (
		<div onClick={()=> handleSelectedEvent() } className={`${activeGenre !== 0 && !genreIDs.includes(activeGenre) && 'd-none'} ${styles.movie_card}`}>
			<div className={`${styles.movie_header} ${styles.manOfSteel}`}>
				<div className={styles.header_icon_container}>
					<a className={styles.linkText} href="#">
						<i className={`material-icons ${styles.header_icon}`}><img
							src={`${imageBaseURl}${listItem?.poster_path}`}
							alt={listItem?.original_title}
							height={12}
							width={12}
							className={`material-icons ${styles.header_icon}`}
						/></i>

					</a>
				</div>
			</div>
			<div className={styles.movie_content}>
				<div className={styles.movie_content_header}>
					<a className={styles.linkText}>
						<h3 className={styles.movie_title}>{listItem?.title}</h3>
					</a>
					<div className={styles.imax_logo}></div>
				</div>
				<div className={styles.movie_info}>
					<div className={styles.info_section}>
						<label>No Of OnGoing Shows</label>
						<span><strong>{listItem?.shows?.length}</strong></span>
					</div>
					<div className={styles.info_section}>
						<label>Language</label>
						<span>{listItem?.original_language}</span>
					</div>
					<div className={styles.info_section}>
						<label>Released Date</label>
						<span>{listItem?.release_date}</span>
					</div>

				</div>
				<div className={styles.info_section}>
					{getGenreLabels(listItem?.genre_ids, genresData)?.map((element: any, index: number) => {
						return (
							<span className={styles.listGenreItemText}>{` ${index!= 0 ? '-' : ' '} ${element.name}`}</span>
						)
					})
					}
				</div>
			</div>
		</div>
	);
}
