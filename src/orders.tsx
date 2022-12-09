import axios from "axios";


export function getAllChapters(id: string, setChapters: any) {
    let r: { title: string, ids: string[] }[] = [];
    let indexLoadChapter = 0;

    axios.get('https://api.mangadex.org/manga/' + id + '/aggregate').then(res => {
        Object.values(res.data.volumes).forEach((volume: any, indexValume) => {
            Object.values(volume.chapters).forEach(
                (chapter: any) => {

                    let title: string;
                    if (volume.volume == 'none' && chapter.chapter == 'none') title = 'One-shot'
                    else if (volume.volume == 'none' && chapter.chapter != 'none') title = 'Chapter ' + chapter.chapter
                    else if (volume.volume != 'none' && chapter.chapter == 'none') title = 'V' + volume.volume + ' ' + 'Chapter ' + '?'
                    else title = 'V' + volume.volume + ' ' + 'Chapter ' + chapter.chapter;


                    [chapter.id, ...chapter.others].forEach((item) => {
                            setTimeout(() => {
                                axios.get('https://api.mangadex.org/chapter/' + item).then(res => {
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
            let indexCompleted = 0;
            ids.forEach((item, index) => {
                    setTimeout(() => {
                        axios.get('https://api.mangadex.org/chapter/' + item).then(res => {

                            let languageRes: string = res.data.data.attributes.translatedLanguage
                            let pages: number = res.data.data.attributes.pages

                            if (language == languageRes && pages > 0)
                                resolve(item);
                            indexCompleted++;
                            if (index == ids.length) {
                                resolve(null);
                            }
                        })

                    }, index++ * 20)

                }
            )
        }
    )
}

export function getLanguagesOfChapters(ids: string[]) {
    return new Promise(resolve => {
            let r: { language: string, id: string }[] = [];
            let indexCompleted = 0;
            ids.forEach((item, index) => {

                    setTimeout(() => {
                        axios.get('https://api.mangadex.org/chapter/' + item).then(res => {

                            let languageRes: string = res.data.data.attributes.translatedLanguage
                            let pages: number = res.data.data.attributes.pages

                            if (pages > 0) {
                                r.push({
                                    language: languageRes,
                                    id: item
                                })
                            }
                            indexCompleted++;
                            // console.log(index,ids.length)
                            if (indexCompleted == ids.length) resolve(r.slice())

                        })

                    }, index++ * 20)

                }
            )
        }
    )
}