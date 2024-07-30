import axios from "axios";
import url from '../constant.js'

const srcApiHandler = async (animeId,episodeNo,subOrDub='sub',apiServer='gogoanime') => {
    const apiUrl = 'http://127.0.0.1:3000/anime'
    const animeName = (await axios.get(`${url}/anime/info?id=${animeId}`)).data.anime.info.name
    switch(apiServer){
        case 'gogoanime':
            const searchData = (await axios.get(`${apiUrl}/gogoanime/${animeName}?page=1`)).data.results
                .filter((e) => e.subOrDub === subOrDub)[0]
            const episodeSrc = (await axios.get(`${apiUrl}/gogoanime/watch/${searchData.id}-episode-${episodeNo}`)).data.sources
            return episodeSrc;
            break;
    }
}

export default srcApiHandler