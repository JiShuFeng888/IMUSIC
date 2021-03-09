<!--  -->
<template>
    <div class="player">
   <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
   <MiniPlayer></MiniPlayer>
   <ListPlayer></ListPlayer>
   <audio :src="currentSong.url" ref="audio" @timeupdate ="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import {mapGetters,mapActions} from 'vuex'
import modeType from './../store/modeType'
import {getRandomIntInclusive,setLocalStorage,getLocalStorage} from  './../tools/tools'
    export default {
        name:'',
        props:[''],
        data () {
            return {
                totalTime:0,
                currentTime:0,
            };
        },
        components: {
            NormalPlayer,
            MiniPlayer,
            ListPlayer
        },
        computed: {
            ...mapGetters([
                'currentSong',
                'isPlaying',
                'currentIndex',
                'curTime',
                'historyList',
                'songs',
                'modeType'
                
            ])
        },
        created(){
            // window.localStorage.clear(); 
            // let historyList = JSON.parse(window.localStorage.getItem('historyList'));
            let historyList = getLocalStorage('historyList');
            if(historyList!==null){
                this.setHistoryList(historyList);
            }
        },
        beforeMount() {},
        mounted() {
            this.$refs.audio.oncanplay=()=>{
                this.totalTime=this.$refs.audio.duration;
                // console.log(this.totalTime);
            }
        },
        methods: {
            ...mapActions([
                'setHistorySong',
                'setHistoryList',
                'setCurrentIndex'

            ]),
          timeupdate(el){
              this.currentTime=el.currentTarget.currentTime;
          },
          end(){
              if(this.modeType===modeType.loop){
                this.setCurrentIndex(this.currentIndex+1);
              }else if(this.modeType===modeType.one){
                    this.$refs.audio.play();
              }else if(this.modeType===modeType.random){
                    let index=getRandomIntInclusive(0,this.songs.length-1);
                    this.setCurrentIndex(index);
              }
          }
        },
        watch: {
            historyList(newvalue,oldvalue){
                // window.localStorage.setItem('historyList', JSON.stringify(newvalue));
                setLocalStorage('historyList',newvalue);
            },
            curTime(newvalue,oldvalue){
                this.$refs.audio.currentTime=newvalue;
            },
            isPlaying(newvalue,oldvalue){
                if(newvalue){
                    this.setHistorySong(this.currentSong);
                    // console.log(this.currentSong);
                    this.$refs.audio.play();
                }else{
                    this.$refs.audio.pause();
                }
            },
            currentSong(newvalue,oldvalue){
                 this.$refs.audio.oncanplay=()=>{
                    this.totalTime=this.$refs.audio.duration;
                    this.setHistorySong(this.currentSong);
                    if(this.isPlaying){
                         this.$refs.audio.play();
                    }else{
                        this.$refs.audio.pause();
                    }
                }
            },
            currentIndex(newvalue,oldvalue){
                this.$refs.audio.oncanplay=()=>{
                    this.totalTime=this.$refs.audio.duration;
                    this.setHistorySong(this.currentSong);
                    if(this.isPlaying){
                         this.$refs.audio.play();
                    }else{
                        this.$refs.audio.pause();
                    }
                }
            }
        }

    }

</script>

<style lang='scss' scoped>

</style>