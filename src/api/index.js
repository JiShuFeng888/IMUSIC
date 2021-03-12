import Network from './network'
export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getAlbum = () => Network.get('/album/newest')
export const getSong = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail',data)
export const getAlbumList = (data) => Network.get('album',data)
export const getSongDetail = (data) => Network.get('/song/detail',data)
export const getSongLyric = (data) => Network.get('/lyric',data)
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
  