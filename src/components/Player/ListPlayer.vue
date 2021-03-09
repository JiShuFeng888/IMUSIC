<!--  -->
<template>
    <transition v-bind:css="false"
                v-on:enter="enter"
                v-on:leave="leave"  >
    <div class="list-player" v-show="isListPlay">
        <div class="player-wrapper">
            <div class="player-top">
                <div class="top-left">
                    <div class="mode" @click="toggleMode" ref="mode"></div>
                    <p v-show="this.modeType===0">顺序播放</p>
                    <p v-show="this.modeType===1">单曲播放</p>
                    <p v-show="this.modeType===2">随机播放</p>
                </div>
                <div class="top-right">
                    <div class="del" @click="DelAllSong"></div>
                </div>
            </div>
            <div class="player-middle">
                <ScrollView ref="list">
                    <ul ref="play">
                        <li class="item" v-for="(value,index) in songs" :key="value.id" @click="selectMusic(index)">
                            <div class="item-left">
                                <div class="item-play" @click.stop="togglePlay" v-show="index===currentIndex"></div>
                                <p>{{value.name}}</p>
                            </div>
                            <div class="item-right">
                                <div class="item-favorite" @click.stop="favoriteSong(value)" :class="{'active':isFavorite(value)}"></div>
                                <div class="item-del" @click.stop="del(index)"></div>
                            </div>
                        </li>
                    </ul>
                </ScrollView>
            </div>
            <div class="player-bottom">
                <p @click="close">关闭</p>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import ScrollView from '../Scrollview'
import  Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import modeType from './../../store/modeType'
    export default {
        name:'',
        props:[''],
        data () {
            return {
               

            };
        },
        components: {
            ScrollView,
        },
        computed: {
            ...mapGetters([
               'isPlaying',
                'modeType',
                'isListPlay',
                'songs',
                'currentIndex',
                'favoriteList'

           ]),
        },
        created(){
            let favoriteLists = JSON.parse(window.localStorage.getItem('favoriteList'));
            if(favoriteLists!==null){
                this.setFavoriteList(favoriteLists);
            }
        },
        beforeMount() {},
        mounted() {},
        methods: {
            ...mapActions([
                'setPlaying',
                'setModeType',
                'setListPlay',
                'setDelSong',
                'setDelAllSong',
                'setFullScreen',
                'setMiniPlayer',
                'setCurrentIndex',
                'setFavoriteSong',
                'setFavoriteList'
            ]),
            isFavorite(song){
                let result=this.favoriteList.find(function(value){
                    return value.id===song.id;
                });
                return result!==undefined;
            },
             favoriteSong(song){
                this.setFavoriteSong(song);
            },
            selectMusic(index){
                this.setCurrentIndex(index);
            },
            DelAllSong(){
                this.setDelAllSong();
                this.setFullScreen(false);
                this.setListPlay(false);
                this.setMiniPlayer(false);
            },
            del(index){
                this.setDelSong(index);
                // console.log(this.songs);
                if(this.songs.length===0){
                    this.setListPlay(false);
                }
            },
            toggleMode(){
                if(this.modeType===modeType.loop){
                this.setModeType(modeType.one);
                }else if(this.modeType===modeType.one){
                  this.setModeType(modeType.random);
                }else if(this.modeType===modeType.random){
                  this.setModeType(modeType.loop);
                }
            },
            togglePlay(){
                this.setPlaying(!this.isPlaying);
            },
            close(){
                this.setListPlay(false);
            },
            enter(el, done){
                // el.offsetWidth;
                // el.offsetHeight;
                Velocity(el,"transition.perspectiveUpIn", { duration: 500 },function(){
                   done();
               });
                //注意点: 动画执行完毕之后一定要调用done回调函数
                // done();
            },
            leave(el){
               Velocity(el,"transition.perspectiveDownOut", { duration: 500 },function(){
                   done();
               });
            }
        },
        watch: {
             favoriteList(newvalue,oldvalue){
                window.localStorage.setItem('favoriteList', JSON.stringify(newvalue));
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
            },
            isListPlay(newvalue,oldvalue){
                this.$refs.list.refresh();
            }
        }

    }

</script>

<style lang='scss' scoped>
@import './../../assets/css/mixin.scss';
.list-player{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    @include bg_sub_color();
    .player-wrapper{
        width: 100%;
        .player-top{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-left{
                display: flex;
               align-items: center;
               padding: 20px;
                .mode{
                    width: 56px;
                    height: 56px;
                     @include bg_img('../../assets/images/small_loop');
                     margin-right: 20px;
                     &.loop{
                     @include bg_img('../../assets/images/small_loop');
                     }
                     &.one{
                     @include bg_img('../../assets/images/small_one');
                     }
                     &.random{
                     @include bg_img('../../assets/images/small_shuffle');
                     }
                }
                p{
                    @include font_size($font_medium_s);
                    @include font_color(); 
                }
            }
            .top-right{
                .del{
                    width: 84px;
                    height: 84px;
                    @include bg_img('./../../assets/images/small_del');
                }
            }
        }
        .player-middle{
            height:700px;
            overflow:hidden;
            ul{
                &.active{
                    .item{
                        .item-play{
                            @include bg_img('../../assets/images/small_play');
                        }
                    }
                }
            }
            .item{
                border-top: 1px solid #ccc;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                box-sizing: border-box;
                .item-left{
                    height: 100px;
                    display: flex;
                    align-items: center;
                    .item-play{
                        width: 56px;
                        height: 56px;                    
                        margin-right: 20px;
                        @include bg_img('../../assets/images/small_pause');
                    }   
                    p{
                        @include font_color();
                        @include font_size($font_medium_s);
                    }
                }
                .item-right{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .item-favorite{
                         width: 56px;
                        height: 56px;                    
                        @include bg_img('../../assets/images/small_un_favorite');
                        &.active{
                        @include bg_img('../../assets/images/small_favorite');
                        }
                    }
                       .item-del{
                        width: 50px;
                        height: 50px;                    
                        margin-left: 20px;
                        @include bg_img('../../assets/images/small_close')
                    }
                }
            }
        }
        .player-bottom{
            width: 100%;
            height: 100px;
              @include bg_color();
            p{
                text-align: center;
                line-height: 100px;
                @include font_color();
                color: #fff;
            }
        }
    }
}
</style>