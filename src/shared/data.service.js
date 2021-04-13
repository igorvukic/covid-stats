import axios from 'axios';
import { COUNTRY, ACTIVE_CASES, DEATH_CASES, RECOVERED_CASES} from './table-fields';

const getCountriesData = async function() {
    try {
        const response = await axios.get('https://api.covid19api.com/summary');
        const list = parseList(response);
        const coutriesData = mapListToCountries(list);
        return coutriesData;
    } catch(error) {
        console.error(error)
        return [];
    }
};

const parseList = (response) => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') return [];
    return list;
}

const mapListToCountries = (list) => {
    const countriesData = list.Countries.map(country => {
        return {
            [COUNTRY]: country.Country,
            [ACTIVE_CASES]: country.TotalConfirmed,
            [DEATH_CASES]: country.TotalDeaths,
            [RECOVERED_CASES]: country.TotalRecovered,
        }
    });
    return countriesData;

}

export const dataService = {
    getCountriesData,
}