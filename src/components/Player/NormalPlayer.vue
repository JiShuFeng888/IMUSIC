<!--  -->
<template>
    <transition v-bind:css="false"
                v-on:enter="enter"
                v-on:leave="leave"  >
    <div class="normal-player" v-show="this.isFullScreen">
    <!-- <div class="normal-player" v-show="this.$store.getters.isFullScreen"> -->
        <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
        </div>
        <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
        </div>
    </div>
    </transition>
</template>

<script>
import PlayerBottom from './PlayBottom';
import PlayerHeader from './PlayerHeader';
import PlayerMiddle from './PlayerMiddle';
import {mapGetters,mapActions} from 'vuex'
import  Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
    export default {
        name:'NormalPlayer',
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
        components: {
            PlayerMiddle,
            PlayerHeader,
            PlayerBottom
        },
        computed: {
            ...mapGetters([
                'isFullScreen',
                'currentSong',
                'currentLyric',
            ])
        },
        beforeMount() {},
        mounted() {},
        methods: {
            ...mapActions([
                'setSongLyric'
            ]),
            enter(el, done){
                // el.offsetWidth;
                // el.offsetHeight;
               Velocity(el,"transition.fadeIn", { duration: 1000 },function(){
                   done();
               });
                //注意点: 动画执行完毕之后一定要调用done回调函数
                // done();
            },
            leave(el){
               Velocity(el,"transition.fadeOut", { duration: 500 },function(){
                   done();
               });
            },

        },
        watch: {
            currentSong(newvalue,oldvalue){
                // console.log(newvalue.id);
                if(newvalue.id===undefined){
                    return;
                }
                this.setSongLyric(newvalue.id);
            }
        }

    }

</script>

<style lang='scss' scoped>
.normal-player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: cadetblue;
    .player-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        z-index:999; 
        }
    .player-bg{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        filter:blur(5px);
        // background-color: #000;
        img{
            width: 120%;
            height: 100%;
            transform: scale(1.2,1.0);
        }
    } 
}
</style>