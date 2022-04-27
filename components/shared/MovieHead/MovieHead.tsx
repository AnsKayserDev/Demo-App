
import { IMovieListDataProps } from '../../../utilities/interfaces/landingTypes';
import styles from './MovieHead.module.scss'
export default function MovieHead() {
	
	
	return (
		<><main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Mox-Cinema</a>
        </h1>

        <p className={styles.description}>
          Check out the films timing, trailers and more.
          <code className={styles.code}> Once you're all set, you can buy your tickets and snacks online!</code>
        </p>
      </main></>
	);
}
