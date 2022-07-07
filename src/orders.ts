import axios from "axios";


export function getChapters(id:string,setChapters:any) {

axios.get('https://api.mangadex.org/manga/' + id+'/aggregate').then(res => {
    // console.log('https://api.mangadex.org/manga/' + id+'/aggregate')

    const count = res.data.volumes.none.count;
    const data = res.data.volumes.none.chapters;

    const r:[number,string][] = [];

    Object.entries(data).forEach((item:any)=>r.push([parseFloat(item[0]),item[1].id]));
    // console.log(r)
    // r.sort(function(a:any, b:any) {
    //     // console.log(a[0],b[0])
    //     return a[0] - b[0];
    // })
    // // console.log(r)
    //
    // console.log(r)

    // console.log(count)
    // let volumes = Object.values(res.data.volumes).map((item:any)=>item.chapters)
    // let v:string[] =[];
    // volumes.forEach((item:any)=>Object.values(item).map((item:any)=>v.push(item.id)))

    setChapters(r);

})
}