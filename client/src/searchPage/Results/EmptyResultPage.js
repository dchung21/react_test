import React from 'react';
import Logo from '../../Shared/Logo.js';
import { SearchInput } from '../../Shared/SearchInput.js';
import styles from './resultPage.module.css';

export default function EmptyResultPage (props) {
	
    return (
        <div>
	    <div className = {styles.header}>
		<Logo name={styles.searchLogo}/>
		    <SearchInput />
		    <h2>Oops I couldn't find what you're looking for.</h2>
	    </div>			
    </div>
    )
}
