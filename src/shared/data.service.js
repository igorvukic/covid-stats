import axios from 'axios';

const getCountriesData = async function() {
    try {
        const response = await axios.get('https://api.covid19api.com/summary');
        if (!response.data || !response.data.Countries) return [];
        const coutriesData = response.data.Countries;
        return coutriesData;
    } catch(error) {
        console.error(error)
        return [];
    }
};

export const dataService = {
    getCountriesData,
}