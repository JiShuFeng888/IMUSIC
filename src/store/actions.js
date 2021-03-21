import {SET_FULL_SCREEN,SET_MINI_PLAYER,SET_PLAYING,SET_MODE_TYPE,SET_LIST_PLAY,SET_SONG_DETAIL,SET_SONG_LYRIC,SET_DEL_SONG,SET_CURRENT_INDEX,SET_CURRENT_TIME,SET_FAVORITE_LIST,SET_FAVORITE_SONG,SET_HISTORY_LIST,SET_HISTORY_SONG,SET_IS_FIRST_PLAY,SET_CURRENT_SONG} from './mutations-type'
import { getSongDetail,getSongLyric,getSongUrl} from "./../api/index";
export default{
      setFullScreen({commit},flag){
      commit(SET_FULL_SCREEN,flag);
      },
      setMiniPlayer({commit},flag){
        commit(SET_MINI_PLAYER,flag);
     },    
      setListPlay({commit},flag){
      commit(SET_LIST_PLAY,flag);
      },
      setPlaying({commit},flag){
      commit(SET_PLAYING,flag);
   } ,
      setModeType({commit},flag){
      commit(SET_MODE_TYPE,flag);
    },
    async setSongDetail({commit},ids){
        let list=[];
        let result =await getSongDetail({ids:ids.join(',')});
        let url =await getSongUrl({id:ids.join(',')});
        result.songs.forEach(function(value,index){
          let obj={};
          let singer='';
          obj.name=value.name;
          obj.id=value.id;
          // obj.url=url.data[index].url;
          //我要装逼了,歌曲的url 不是按照请求的id 顺序来返回的
          for(let i=0;i<url.data.length;i++){
              if(url.data[i].id===value.id){
                obj.url=url.data[i].url;
              }
          }
          value.ar.forEach(function(value,index){
              if(index===0){
                singer=value.name;
              }else{
                singer+="-"+value.name;
              }
              obj.singer=singer;
          });
          obj.picUrl=value.al.picUrl;
          list.push(obj);
        });
        // console.log(list);
        commit(SET_SONG_DETAIL,list);
       },
    async setSongLyric({commit},id){
        let result =await getSongLyric({id:id});
        if(result.lrc!==undefined){
          let obj=parseLyric(result.lrc.lyric);
          // console.log(result.lrc.lyric);
          commit(SET_SONG_LYRIC,obj);
        }
       },
       setDelSong({commit},index){
        commit(SET_DEL_SONG,index);
      },
      setDelAllSong({commit},index){
        commit(SET_DEL_SONG,index);
      },
       setCurrentIndex({commit},index){
        commit(SET_CURRENT_INDEX,index);
      },
      setCurrentTime({commit},time){
        commit(SET_CURRENT_TIME,time);
      },
      setFavoriteSong({commit},song){
        commit(SET_FAVORITE_SONG,song);
      },
      setFavoriteList({commit},list){
        commit(SET_FAVORITE_LIST,list);
      },
      setHistorySong({commit},song){
        commit(SET_HISTORY_SONG,song);
      },
      setHistoryList({commit},list){
        commit(SET_HISTORY_LIST,list);
      },
      setIsFirstPlay({commit},flag){
        commit(SET_IS_FIRST_PLAY,flag);
      },
      setCurrentSong({commit},song){
        commit(SET_CURRENT_SONG,song);
      },
    
}


// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  // console.log(lyrics);
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseFloat(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim();
    // 6.保存数据
    lyricObj[time] = text;
  })
  return lyricObj;
}
