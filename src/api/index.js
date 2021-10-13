import axios from 'axios'

export function oneWord() {
    return axios.get('https://api.eatrice.top/')
}
