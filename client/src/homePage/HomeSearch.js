import React from 'react';
import { SearchInput } from '../Shared/SearchInput.js';
import { useHistory } from 'react-router-dom'
import Logo from '../Shared/Logo.js';
import styles from './homeSearch.module.css';

export default function HomeSearch() {

	let history = useHistory();

	return(
		<div className={styles.container}>
			<div className={styles.center}>
			<Logo name={styles.homeLogo} />
			<SearchInput />
			</div>
		</div>
	);
}

