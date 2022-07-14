import axios from "axios";
import {strict} from "assert";


export function getAllChapters(id: string, setChapters: any) {
    let r: { title: string, ids: string[] }[] = [];
    let indexLoadChapter = 0;

    axios.get('https://api.mangadex.org/manga/' + id + '/aggregate').then(res => {
        console.log(res.data)
        Object.values(res.data.volumes).forEach((volume: any, indexValume) => {
            Object.values(volume.chapters).forEach(
                (chapter: any) => {

                    let title: string;
                    if (volume.volume == 'none' && chapter.chapter == 'none') title = 'One-shot'
                    else if (volume.volume == 'none' && chapter.chapter != 'none') title = 'Chapter ' + chapter.chapter
                    else if (volume.volume != 'none' && chapter.chapter == 'none') title = 'V' + volume.volume + ' ' + 'Chapter ' + '?'
                    else title = 'V' + volume.volume + ' ' + 'Chapter ' + chapter.chapter

                    const apiChapterInfo = 'https://api.mangadex.org/chapter/' + chapter.id;
                    // setTimeout(() => {
                    [chapter.id, ...chapter.others].forEach((item) => {
                            setTimeout(() => {
                                axios.get('https://api.mangadex.org/chapter/' + item).then(res => {
                                    // console.log(123, res.data)
                                    let language: string = res.data.data.attributes.translatedLanguage

                                    r.push({
                                        title: title + ' ' + language,
                                        ids: [item]
                                    })

                                    setChapters(r.slice())

                                })

                            }, indexLoadChapter++ * 1000)
                        }
                    )

                }
            )
        })
    })
}

export function getChapters(id: string, setChapters: any) {
    let r: { title: string, ids: string[] }[] = [];


    axios.get('https://api.mangadex.org/manga/' + id + '/aggregate').then(res => {
        console.log(res.data)
        Object.values(res.data.volumes).forEach((volume: any, indexValume) => {
            Object.values(volume.chapters).forEach(
                (chapter: any) => {

                    let title: string;
                    if (volume.volume == 'none' && chapter.chapter == 'none') title = 'One-shot'
                    else if (volume.volume == 'none' && chapter.chapter != 'none') title = 'Chapter ' + chapter.chapter
                    else if (volume.volume != 'none' && chapter.chapter == 'none') title = 'V' + volume.volume + ' ' + 'Chapter ' + '?'
                    else title = 'V' + volume.volume + ' ' + 'Chapter ' + chapter.chapter

                    r.push({
                        title: title + ' ',
                        ids: [chapter.id, ...chapter.others]
                    })

                    setChapters(r.slice())


                }
            )
        })
    })
}

export function getChapterByLanguage(ids: string[], language: string) {
    return new Promise(resolve => {
            let en: string;
            ids.forEach((item, index) => {
                    setTimeout(() => {
                        axios.get('https://api.mangadex.org/chapter/' + item).then(res => {

                            let languageRes: string = res.data.data.attributes.translatedLanguage
                            let pages: number = res.data.data.attributes.pages

                            if (language == languageRes && pages > 0)
                                resolve(item);
                            if (language == 'en' && pages > 0)
                                en = item as string;
                            if (index == ids.length) {
                                if (en != undefined) resolve(en);
                                else (resolve(ids[0]))
                            }
                        })

                    }, index++ * 100)

                }
            )
        }
    )
}

export function getLanguagesOfChapters(ids: string[]) {
    return new Promise(resolve => {
            let r: { language: string, id: string }[] = [];
            let index = 0;
            ids.forEach((item) => {

                    // setTimeout(() => {
                    axios.get('https://api.mangadex.org/chapter/' + item).then(res => {

                        let languageRes: string = res.data.data.attributes.translatedLanguage
                        let pages: number = res.data.data.attributes.pages

                        if (pages > 0) {
                            r.push({
                                language: languageRes,
                                id: item
                            })
                        }
                        index++;
                        // console.log(index,ids.length)
                        if (index == ids.length) resolve(r.slice())

                    })

                    // }, index++ * 100)

                }
            )
        }
    )
}