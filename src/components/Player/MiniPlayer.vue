<template>
    <transition v-bind:css="false"
                v-on:enter="enter"
                v-on:leave="leave"  >
  <div class="mini-player" v-show="this.isMiniPlayer">
      <div class="player-wrapper" @click="selectMusic">
          <div class="player-left">
              <img :src="currentSong.picUrl" alt="" ref="cd">
              <div class="player-title">
                <h3>{{currentSong.name}}</h3>
                <p>{{currentSong.singer}}</p>
              </div>
          </div>
          <div class="player-right">
              <div class="play" @click.stop="togglePlay" ref="play"></div>
              <div class="list" @click.stop="listShow"></div>
          </div>
      </div>
  </div>
    </transition>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import  Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
    export default {
        name:'MiniPlayer',
        props:[''],
        data () {
            return {

            };
        },
        components: {},
        computed: {
            ...mapGetters([
                'isMiniPlayer',
                'isPlaying',
                'currentSong'
            ])
        },
        beforeMount() {},
        mounted() {
        
        },
        methods: {
            listShow(){
                this.setListPlay(true)
            },
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                'setPlaying',
                'setListPlay'
            ]),
            togglePlay(){
                this.setPlaying(!this.isPlaying);
            },
            selectMusic(){
                this.setFullScreen(true);
                // this.setMiniPlayer(false);
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
            isPlaying(newvalue,oldvalue){
                if(newvalue){
                    this.$refs.play.classList.remove('active')
                    this.$refs.cd.classList.add('active')
                    }else{
                    this.$refs.play.classList.add('active')
                    this.$refs.cd.classList.remove('active')
                }
            }
        }
    }

</script>

<style lang='scss' scoped>
@import './../../assets/css/mixin.scss';
@keyframes sport {
    from{   
        transform: rotateZ(0deg);
    }
    to{
        transform: rotateZ(360deg);
    }
}
.mini-player{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    .player-wrapper{
        width: 100%;
        height: 100%;
        @include bg_color();
        display: flex;
        justify-content: space-between;
        align-items: center;
        .player-left{
            display: flex;
            padding-left: 30px;
            .player-title{
                display: flex;
                justify-content: center;
                flex-direction: column;
                // align-items: center;
                h3{
                    @include font_size($font_medium);
                    @include font_color();

                }
                p{
                    @include font_size($font_medium_s);
                    @include font_color();
                }
            }
            img{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-right: 20px;
                &.active{
                    animation: sport 5s infinite 0s linear ;
                }
            }
        }
        .player-right{
            display: flex;
            align-items: center;
            .play{
                width: 84px;
                height: 84px;
                @include bg_img('../../assets/images/pause');
                &.active{
                  @include bg_img('../../assets/images/play');
                }
            }
            .list{
                 width: 120px;
                height: 120px;
                @include bg_img('../../assets/images/list')
            }
        }
    }
}
</style>