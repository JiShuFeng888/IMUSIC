<!--  -->
<template>
    <div class="play-bottom">
        <div class="bottom-progress">
            <span ref="eleCurrentTime">00:00</span>
            <div class="progress-bar" @click="progressClick" ref="progressbar">
                <div class="progress-line" ref="line">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span ref="eleTotalTime"></span>
        </div>
        <div class="bottom-control">
            <div class="mode loop" @click="toggleMode" ref="mode"></div>
            <div class="prev" @click="prevSong"></div>
            <div class="play" @click="togglePlay" ref="play"></div>
            <div class="next" @click="nextSong"></div>
            <div class="favorite" @click="favoriteSong" :class="{'active':isFavorite(currentSong)}"></div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex';
import modeType from './../../store/modeType'
import {formartTime} from './../../tools/tools'
import {setLocalStorage,getLocalStorage} from  './../../tools/tools'
    export default {
        name:'',
        props:{
             totalTime:{
                type:Number,
                default:0,
                require:true
            },
              currentTime:{
                type:Number,
                default:0,
                require:true
            }
        },
        data () {
            return {

            };
        },
        components: {},
        computed: {
            ...mapGetters([
                'isPlaying',
                'modeType',
                'currentIndex',
                'currentSong',
                'favoriteList'
                ])
        },  
        beforeMount() {},
        mounted() {},
        created(){
            // window.localStorage.clear();
            // let favoriteLists = JSON.parse(window.localStorage.getItem('favoriteList'));
            let favoriteLists=getLocalStorage('favoriteList');
            if(favoriteLists!==null){
                this.setFavoriteList(favoriteLists);
            }
        },
        methods: {
            ...mapActions([
                'setPlaying',
                'setModeType',
                'setCurrentIndex',
                'setCurrentTime',
                'setFavoriteSong',
                'setFavoriteList'

            ]),
            isFavorite(song){
                let result=this.favoriteList.find(function(value){
                    return value.id===song.id;
                });
                return result!==undefined;
            },
            favoriteSong(){
                this.setFavoriteSong(this.currentSong);
            },
            progressClick(e){
                // let normalLeft=e.target.offsetLeft;
                let normalLeft=this.$refs.progressbar.offsetLeft;
                let eventLeft=e.pageX;
                let clickLeft=eventLeft-normalLeft;
                // let progressLine=e.target.offsetWidth;
                let progressLine=this.$refs.progressbar.offsetWidth;
                let value=clickLeft/progressLine;
                this.$refs.line.style.width=value*100+"%";

                //计算从什么时候开始播放
                 let currentTime=this.totalTime*value;
                 this.setCurrentTime(currentTime);

            },
            prevSong(){
                this.setCurrentIndex(this.currentIndex-1);
            },
            nextSong(){
                this.setCurrentIndex(this.currentIndex+1);
            },
            togglePlay(){
                this.setPlaying(!this.isPlaying);
            },
            toggleMode(){
                if(this.modeType===modeType.loop){
                this.setModeType(modeType.one);
                }else if(this.modeType===modeType.one){
                  this.setModeType(modeType.random);
                }else if(this.modeType===modeType.random){
                  this.setModeType(modeType.loop);
                }
            }
        },
        watch: {
            favoriteList(newvalue,oldvalue){
                // window.localStorage.setItem('favoriteList', JSON.stringify(newvalue));
                setLocalStorage('favoriteList',newvalue);
            },
            totalTime(newvalue,oldvalue){
                let time=formartTime(newvalue);                         
                this.$refs.eleTotalTime.innerHTML=time.minute+":"+time.second;                                                   
            },
            currentTime(newvalue,oldvalue){
                //1.格式化时间
                let time=formartTime(newvalue);                         
                this.$refs.eleCurrentTime.innerHTML=time.minute+":"+time.second;                                                   
                //2.初始化进度条进度
                let value=newvalue/this.totalTime;
                this.$refs.line.style.width=value*100+"%";


            },
            isPlaying(newvalue,oldvalue){
                if(newvalue){
                    this.$refs.play.classList.remove('active')
                    }else{
                    this.$refs.play.classList.add('active')
                }
            },
            modeType(newvalue,oldvalue){
                if(newvalue===0){
                    this.$refs.mode.classList.add('loop')
                    this.$refs.mode.classList.remove('random')
                }else if(newvalue===1){
                    this.$refs.mode.classList.add('one')
                    this.$refs.mode.classList.remove('loop')
                }else if(newvalue===2){
                    this.$refs.mode.classList.add('random')
                    this.$refs.mode.classList.remove('one')
                }
            }
        }

    }

</script>
<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';

.play-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .bottom-progress{
        width: 80%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            @include font_size($font_small);
            @include font_color();
        }
        .progress-bar{
            width: 100%;
            margin: 0 10px; 
            height: 10px;
            background-color: #fff; 
            .progress-line{
                position: relative;
                width: 0%;
                height: 100%;
                background-color: #cccccc;
                .progress-dot{
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background-color: #fff;

                }
            }
        }
    }
    .bottom-control{
        width: 80%;
        margin:0 auto;
        padding:50px;
        padding-left: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
            width: 84px;
            height: 84px;
        }
        .mode{
            &.loop{
                @include bg_img('../../assets/images/loop');
            }
            &.one{
                @include bg_img('../../assets/images/one')
            }
            &.random{
                @include bg_img('../../assets/images/shuffle')
            }
        }
        .prev{
            @include bg_img('../../assets/images/prev');
        }
        .play{
            @include bg_img('../../assets/images/pause');
            &.active{
            @include bg_img('../../assets/images/play');
            }
        }
        .next{
            @include bg_img('../../assets/images/next');
        }
        .favorite{
            @include bg_img('../../assets/images/un_favorite');
            &.active{
            @include bg_img('../../assets/images/favorite');
            }
        }

    }
}
</style>