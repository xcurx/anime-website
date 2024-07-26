import axios from "axios";

async function findTotalEpisodes(id){
    const res = await axios.get(`/anime/info?id=${id}`)
    // console.log(res.data);
    return res.data.anime.info.stats.episodes
}

export default findTotalEpisodes