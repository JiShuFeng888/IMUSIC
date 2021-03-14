<!--  -->
<template>
    <Swiper :options="swiperOptions" class="banner">
    <SwiperSlide class="cd">
      <div class="cd-wrapper" ref="cd">
          <img :src="currentSong.picUrl" alt="">
      </div>        <p>{{getFirstLyric()}}</p>
    </SwiperSlide>
    <SwiperSlide  class="lyric" ref="lyric">
      <Scrollview ref="scroll">
          <ul>
              <li v-for="(value,index) in currentLyric" :key="index" :class="[{'active':index===currentLineTime}]">{{value}}</li>
          </ul>
      </Scrollview>
    </SwiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Scrollview from '../../components/Scrollview'
import {mapGetters} from 'vuex';

    export default {
        name:'',
        props:{
               currentTime:{
                type:Number,
                default:0,
                require:true
            }
        },
        data() {
            return {
                swiperOptions: {
                    // 如果需要分页器
                    pagination: {   
                    el: '.swiper-pagination',
                    bulletClass : 'my-bullet',//需设置.my-bullet样式
                    bulletActiveClass: 'my-bullet-active',
                    },
                    //如果数据是从网络上获取的，异步加载的，加入以下配置
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                },
                currentLineTime:0,
            }
        },
        components: {
            Swiper,
            SwiperSlide,
            Scrollview
        },
        computed: {
            ...mapGetters([
                'isPlaying',
                'currentSong',
                'currentLyric',
            ])
        },
        beforeMount() {},
        mounted() {},
        methods: {
            getFirstLyric(){
                for(let key in this.currentLyric){
                    return this.currentLyric[key];
                    //返回第一个的值
                }
            },
            getActionLyricNum(lineNum){
                if(lineNum<0){
                    return this.currentLineTime;
                }
                //设置歌词必高亮
                let result=this.currentLyric[lineNum+""];
                if(result===undefined||result===''){
                    lineNum--;
                    return this.getActionLyricNum(lineNum);
                }else{
                    return lineNum+"";
                }
            }
        },
        watch: {
            currentLyric(newvalue,oldvalue){
                for(let key in newvalue){
                    this.currentLineTime=key;
                    return;
                }
            },
            isPlaying(newvalue,oldvalue){
                if(newvalue){
                    this.$refs.cd.classList.add('active')
                    }else{
                    this.$refs.cd.classList.remove('active')
                }
            },
            currentTime(newvalue,oldvalue){ 
                this.$nextTick(function(){

                    //1.设置歌词高亮
                    let lineNum=Math.floor(newvalue);
                    this.currentLineTime=this.getActionLyricNum(lineNum);
                    //2.设置歌词在视野中部
                    if(document.querySelector(".lyric .active")){
                        //修复纯音乐没有歌词的bug
                        let lyricTop=document.querySelector(".lyric .active").offsetTop;
                        let wrapperHeight=this.$refs.lyric.$el.offsetHeight;
                        if(lyricTop>wrapperHeight/2){
                            this.$refs.scroll.scrollTo(0,wrapperHeight/2-lyricTop);
                        }else{
                            // this.$refs.scroll.scrollTo(0,0,100);
                        }
                    }
                })
                
                
            }
        }

    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';
.banner{
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    .cd{
        .cd-wrapper{
            width: 500px;
            height: 500px;
            border-radius: 50%;
            margin: 0 auto;
            border: 30px solid #ffffff;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            &.active{
                img{
                width: 100%;
                height: 100%;
                animation: sport 5s infinite 0s linear ;
                } 
            }
        }
        p{
            text-align: center;
            @include font_size($font_medium);
            @include font_color();
            margin-top: 50px;
        }
    }
    .lyric{
        ul{
            li{
                @include font_size($font_medium);
                @include font_color();
                text-align: center;
                margin: 10px 0;
                &:last-of-type{
                    padding-bottom: 50%;
                }
                &.active{
                    color: #fff;
                }
            }
        }
    }
}
</style>
<style lang='scss'>
@import '../../assets/css/mixin.scss';
@keyframes sport {
    from{   
        transform: rotateZ(0deg);
    }
    to{
        transform: rotateZ(360deg);
    }
}
.my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 20px;
}
.my-bullet-active{  
    width: 40px;
    @include bg_color();
}

</style>