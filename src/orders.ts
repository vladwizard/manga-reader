import axios from "axios";


export function getChapters(id: string, setChapters: any) {

    axios.get('https://api.mangadex.org/manga/' + id + '/aggregate').then(res => {

        console.log(res.data)

        const r: [string, string][] = [];

            const data: any = [];
            Object.values(res.data.volumes).forEach((item1: any) => Object.values(item1.chapters).forEach((item:any)=>data.push(item)));

            Object.entries(data).forEach((item: any) => r.push([item[0] == 'none' ? 'One-shot' : 'Глава ' + item[0], item[1].id]));

        setChapters(r);

    })
}