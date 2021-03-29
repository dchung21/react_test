//This component is the search page, basically the parent component to everything on that page

import React, { useCallback, useState, useEffect } from 'react';
import styles from './App.module.css';
import { MapBox } from './Map/Map.js';
import ResultList from './Results/ResultList.js';
import { SearchInput } from '../Shared/SearchInput.js';
import FilterList from './Filters/FilterList.js';
import FilterModal from './Filters/FilterModal.js';
import Logo from '../Shared/Logo.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import './styles.css';

export default function App(props) {
    const [rows, setRows] = useState([]);
    const [geocoord, setGeocoord] = useState([0, 0]);
    const [address, setAddress] = useState(props.match.params.address);
    const [filters, setFilters] = useState({ "Services": [], "Payment": [], "Language": [] });
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("");
    const [visibleBox, setVisibleBox] = useState(-1);
    const [loading, setIsLoading] = useState(true);
    const [distance, setDistance] = useState(10);

    //media query stuff
    const isSmall = useMediaQuery('(min-width:600px)');

    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            await Axios.get(`../api/searchClinics/address=${props.match.params.address}&distance=${distance}`).then(function (response) {
                setRows(response.data.rows);
                setGeocoord([...response.data.geocoord]);
                setIsLoading(false);
                setAddress(response.data.address);
            });
        }
        fetchData();
    }, []);

    //Function to open modal of some filter (The see all filters)
    const onOpenModal = (filterType) => () => {
        setDialogOpen(true);
        setCurrentFilter(filterType);
    }

    /*
        Function to close modal of some filter (The see all filter)
    */
    const onClose = (e) => {
        setDialogOpen(false);
    }

    const visibleInfoBox = (k) => {
        setVisibleBox(k);
    }

    const deactivateInfoBox = (k) => {
        setVisibleBox(-1);
    }

    /*
        Function applies filters and refreshes the clinics on the page
    */
    const filterClinic = (event) => {
        setIsLoading(true);
        let cloneFilters = { ...filters };
        const category = event.target.id;
        console.log(category);
        let filter = cloneFilters[category];

        if (event.target.checked) {
            filter.push(event.target.value);
        }

        else {
            let i = filter.indexOf(event.target.value);
            filter.splice(i, 1)
        }

        let filterData = {
            filter: cloneFilters,
            geocoord: geocoord,
            distance: distance,
        }


        Axios.post('/api/filterClinics', filterData).then(function (response) {
            setRows(response.data.rows);
            setFilters(cloneFilters);
            setIsLoading(false);
        });

    }

    /*
        Function handles the change of distance and refreshes clinics on the page
    */
    const changeDistance = (event) => {
        let value = event.target.value;
        setDistance(value);
        setIsLoading(true);
        Axios.get(`../api/searchClinics/address=${address}&distance=${value}`).then(function (response) {
            setRows(response.data.rows);
            setIsLoading(false);
        });

    }

    /*
    	
    */
    const singularFilter = (filterName, filter) => {
        let cloneFilters = { ...filters };
        cloneFilters[filterName] = filter;

        let filterData = {
            filter: cloneFilters,
            geocoord: geocoord,
            distance: distance,
        }

        Axios.post('/api/filterClinics', filterData).then(function (response) {
            setFilters(cloneFilters);
            setDialogOpen(false);
            setRows(response.data.rows);
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Logo name={styles.searchLogo} />
                <SearchInput />
            </div>

            <div className={styles.body}>

                {/*** modal for filters ***/}
                <FilterModal
                    name={currentFilter}
                    isOpen={isDialogOpen}
                    onClose={onClose}
                    onSubmit={singularFilter}
                />

                {/*** component that shows all the filters on the side ***/}
                <FilterList
                    isOpen={isSmall}
                    onChange={filterClinic}
                    openModal={onOpenModal}
                    isOpen={isDialogOpen}
                    distance={distance}
                    onDistanceChange={changeDistance}
                />

                {/*** Component that holds the scrollable selection of clinics ***/}
                <ResultList
                    rows={rows}
                    enableVisibility={visibleInfoBox}
                    disableVisibility={deactivateInfoBox}
                    address={address}
                    isLoading={loading}
                />

                {/*** component that holds the map ***/}
                <MapBox
                    rows={rows}
                    center={geocoord}
                    cn={styles.mapBox}
                />
            </div>
        </div>
    );
}




