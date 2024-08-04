import axios from "axios";
import {url} from '../constant.js'

async function listFinder(listName, page){
    const res = await axios.get(`${url}/anime/${listName}?page=${page}`)
    // console.log(res.data);
    return res.data.animes.splice(0,5)
}

export default listFinder