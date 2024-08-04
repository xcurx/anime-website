import axios from "axios";
import {mainUrl,url} from '../constant.js'

const srcApiHandler = async (animeId,episodeNo,subOrDub='sub',apiServer='gogoanime') => {
    const animeName = (await axios.get(`${url}/anime/info?id=${animeId}`)).data.anime.info.name
    switch(apiServer){
        case 'gogoanime':
            const searchData = (await axios.get(`${mainUrl}/gogoanime/${animeName}?page=1`)).data.results
                .filter((e) => e.subOrDub === subOrDub)[0]
            const episodeSrc = (await axios.get(`${mainUrl}/gogoanime/watch/${searchData.id}-episode-${episodeNo}`)).data
            return episodeSrc;
            break;
    }
}

export default srcApiHandler