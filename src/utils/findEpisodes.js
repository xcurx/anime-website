import axios from "axios";
import {url} from '../constant.js'

async function findTotalEpisodes(id){
    const res = await axios.get(`${url}/anime/info?id=${id}`)
    // console.log(res.data);
    return res.data.anime.info.stats.episodes
}


export default findTotalEpisodes