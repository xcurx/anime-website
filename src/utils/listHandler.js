import axios from "axios";

async function listFinder(listName, page){
    const res = await axios.get(`/anime/${listName}?page=${page}`)
    return res.data.animes.splice(0,5)
}

export default listFinder