import {SET_FULL_SCREEN,SET_MINI_PLAYER,SET_PLAYING,SET_MODE_TYPE,SET_LIST_PLAY,SET_SONG_DETAIL,SET_SONG_LYRIC,SET_DEL_SONG,SET_CURRENT_INDEX,SET_CURRENT_TIME,SET_FAVORITE_LIST,SET_FAVORITE_SONG,SET_HISTORY_LIST,SET_HISTORY_SONG,SET_CURRENT_SONG,SET_IS_COMMENT} from './mutations-type'
export default{
        [SET_FULL_SCREEN](state,flag){
          state.isFullScreen=flag;
          if(flag){
            state.isMiniPlayer=false;
            state.isListPlay=false;
          }
        },
        [SET_MINI_PLAYER](state,flag){
          state.isMiniPlayer=flag;
          if(flag){
            state.isFullScreen=false;
            state.isListPlay=false;
          }
        },
        [SET_PLAYING](state,flag){
          state.isPlaying=flag;
        },
        [SET_MODE_TYPE](state,flag){
          state.modeType=flag;
        },
        [SET_LIST_PLAY](state,flag){
          state.isListPlay=flag;
          if(flag){
            state.isMiniPlayer=false;
            state.isFullScreen=false;
          }
        },
        [SET_SONG_DETAIL](state,flag){
          state.songs=flag;
          console.log(state.songs);
        },
        [SET_SONG_LYRIC](state,lyric){
          state.currentLyric=lyric;
        },
        [SET_DEL_SONG](state,index){
          state.songs.splice(index,1);
          if(index===undefined){
            state.songs=[];
          }
          if(index<state.currentIndex){
            state.currentIndex=state.currentIndex-1;
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        },
        [SET_CURRENT_INDEX](state,index){

              if(index<0){
                // console.log(index);
                state.currentIndex=state.songs.length-1;
              }else if(index>state.songs.length-1){
                state.currentIndex=0;
                console.log(index);
                console.log(state.songs.length);
              }else{
                state.currentIndex=index;
                console.log(state.currentIndex);
              }


        },
        [SET_CURRENT_TIME](state,time){
          state.curTime=time;
        },
        [SET_FAVORITE_SONG](state,song){
          let result=state.favoriteList.find(function(currentValue){
              if(currentValue.id===song.id||song.name===''){
                return true;
              }
              // return currentValue.id===song.id;
          });
          if(result===undefined){
            state.favoriteList.push(song);
          }else{
            state.favoriteList.forEach(function(value,index){
                if(value.id===song.id){
                    state.favoriteList.splice(index,1);
                }
            });
            // state.favoriteList=state.favoriteList.filter(function(value){
            //     if(value.id!==song.id){
            //       return true;
            //     }
            // });
          }
        },
        [SET_FAVORITE_LIST](state,list){
          state.favoriteList=list;
        },
        [SET_HISTORY_SONG](state,song){
          let result=state.historyList.find(function(currentValue){
              if(currentValue.id===song.id){
                // console.log(song);
                return true;
              }
          });
          if(result===undefined){
            if(state.historyList.length>30){
                state.historyList.splice(0,1);
            }
            state.historyList.push(song);
          }
        },
        [SET_HISTORY_LIST](state,list){
          state.historyList=list;
        },
        [SET_CURRENT_SONG](state,song){
            state.currentSong=song;
        },
        [SET_IS_COMMENT](state,song){
          state.isComment=song;
        }

}
