// import { delete } from 'vue/types/umd'
import Network from './network'
export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getAlbum = () => Network.get('/album/newest')
export const getSong = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail',data)
export const getAlbumList = (data) => Network.get('album',data)
export const getSongDetail = (data) => Network.get('/song/detail',data)
export const getSongLyric = (data) => Network.get('/lyric',data)
export const getTopList = (data) => Network.get('/playlist/detail',data)
export const getArtistSongs = (data) => Network.get('artists',data)
export const getSongUrl = (data) => Network.get('/song/url',data)
// export const getHotSinger = () => Network.get('/top/artists?offset=0&limit=30')
export const getHotSingers = () => {
    return new Promise(function (resolve, reject) {
      Network.get('top/artists?offset=0&limit=5')
        .then(function (result) {
          resolve(result.artists)
        })
        .catch(function (err) {
          reject(err)
        })
    })
}
export const getLetterSingers = (letter) => {
    return new Promise(function (resolve, reject) {
        let letterSingers=[];
      Network.all([
        Network.get(`/artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=1&area=8&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=2&area=8&initial=${letter}`),
      ])
        .then(function (result) {
        result.forEach(function(value){
            letterSingers.push(...value.artists)
        })
        // console.log(letterSingers);
            resolve(letterSingers)
        })
        .catch(function (err) {
          reject(err)
        })
    })
}
export const getAllArtist=(letter)=>{
      return new Promise(function(resolve,reject){

          let keys=['热']
          let list=[getHotSingers()]
          for(let i=65;i<91;i++){
              let char=String.fromCharCode(i);
              keys.push(char)
              list.push(getLetterSingers(char))
          }
          Network.all(list)
            .then(function(result){
                let obj={}
                obj.keys=keys
                obj.list=result
                resolve(obj)
            })
            .catch(function(err){
                reject(err)
            })

      })
}
export const  getTopListDetail = () => {
  return new Promise(function(resolve,reject){
    let category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('/toplist/detail')
      .then(function(data){
        data.list.forEach(function(obj){
            // let flag=false
            for(let key in category){

              for(let i=0;i<category[key].length;i++){
                   
                  if(category[key][i].name===obj.name){
                      category[key][i].rank=obj;
                      break; 

                    }
              }
            }
     
        }),
        resolve(category)
      })
      .catch(function(err){
        reject(err)
      })
  })
}