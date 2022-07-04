import axios from "axios";


export function getChapters(id:string,setChapters:any) {

axios.get('https://api.mangadex.org/manga/' + id+'/aggregate').then(res => {
console.log(res)
    let volumes = Object.values(res.data.volumes).map((item:any)=>item.chapters)
    let v:string[] =[];
    volumes.forEach((item:any)=>Object.values(item).map((item:any)=>v.push(item.id)))

    setChapters(v);
})
}