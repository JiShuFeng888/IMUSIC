export default{
      isFullScreen(state){
        return state.isFullScreen;
      },
      isMiniPlayer(state){
        return state.isMiniPlayer;
      },
      isPlaying(state){
        return state.isPlaying;
      },
      modeType(state){
        return state.modeType;
      },
      isListPlay(state){
        return state.isListPlay;
      },
      songs(state){
        return state.songs;
      },
      currentSong(state) {
        let obj = {
          name: '',
          singer: '',
          picUrl: null
        }
        if (state.songs.length !== 0) {
          obj = state.songs[state.currentIndex]
        }
        return obj;
      },
      currentLyric(state){
        return state.currentLyric;
      },
      currentIndex(state){
        return state.currentIndex;
      },
      curTime(state){
        return state.curTime;
      },
      favoriteList(state){
        return state.favoriteList;
      },
      historyList(state){
        return state.historyList;
      },
      isFirstPlay(state){
        return state.isFirstPlay;
      }
  }