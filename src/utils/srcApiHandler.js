import axios from "axios";
import {mainUrl,url} from '../constant.js'

const srcApiHandler = async (animeId,episodeNo,subOrDub='sub',apiServer='gogoanime') => {
    const animeName = (await axios.get(`${url}/anime/info?id=${animeId}`)).data.anime.info.name
    switch(apiServer){
        case 'gogoanime':
            const searchData = (await axios.get(`${mainUrl}/anime/gogoanime/${animeName}?page=1`)).data.results
                .filter((e) => e.subOrDub === subOrDub)[0]
            const id = searchData?.id?.split('-').filter(e => e != 'tv').join('-')
            if(id){
                const episodeSrc = (await axios.get(`${mainUrl}/anime/gogoanime/watch/${id}-episode-${episodeNo}`)).data
                return episodeSrc;
                break;
            }
    }
}

async function imdbInfo(animeId) {
    try {
        const animeInfo = (await axios.get(`${url}/anime/info?id=${animeId}`)).data
        const animeName = animeInfo.anime.info.name
        const animeDate = animeInfo.anime.moreInfo.premiered.split(' ').at(-1)
        const animeType = animeInfo.anime.info.stats.type
        // console.log(animeDate);
        // console.log(animeInfo);
        const data = (await axios.get(`${mainUrl}/meta/tmdb/${animeName}`)).data.results
        // console.log(data);
        const searchResult = data.find(e => e.releaseDate == animeDate && e.type.split(' ')[0] == animeType)
        const searchId = searchResult.id
        const searchType = searchResult.type
    
        const imdbData = (await axios.get(`${mainUrl}/meta/tmdb/info/${searchId}?type=${searchType}`)).data
        return imdbData
        // console.log(imdbData);
    } catch (error) {
        return false;
    }
}

export {
    srcApiHandler,
    imdbInfo
}