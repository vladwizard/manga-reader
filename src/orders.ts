import axios from "axios";


export function getChapters(id: string, setChapters: any) {

    axios.get('https://api.mangadex.org/manga/' + id + '/aggregate').then(res => {



        const r: [string, string][] = [];

            let data = res.data;

            const volumes: any = [];

            Object.values(res.data.volumes).forEach((volume: any) => Object.values(volume.chapters).forEach((chapter:any)=>r.push([(volume.volume!='none'?'V'+ volume.volume+' ':'') +'Chapter ' + chapter.chapter, chapter.id])));
            // Object.values(res.data.volumes).forEach((volume: any) => console.log(volume.chapter);

            // Object.entries(volumes).forEach((item: any) => r.push([item[0] == 'none' ? 'One-shot' : 'Chapter ' + item[1].chapter, item[1].id]));

        setChapters(r);

    })
}