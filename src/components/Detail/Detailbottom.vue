<!--  -->
<template>
    <ul class="detail-bottom"> 
       <li class="bottom-top" @click="selectAllMusic">
           <div class="bottom-icon"></div>
           <div class="bottom-title">播放全部</div>
       </li> 
       <li v-for="(value,index) in playlist" :key="value.id" class="item" @click="selectMusic(value.id,index)">
           <h3>{{value.name}}</h3>
           <p>{{value.al.name}}-{{value.ar[0].name}}</p>
       </li>
    </ul>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

    export default {
        name:'',
        props:{
            playlist:{
                type:Array,
                default:()=>[],
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
               'isFirstPlay',
           ])
        },
        beforeMount() {},
        mounted() {},
        methods: {
            ...mapActions([
                'setFullScreen',
                 'setMiniPlayer',
                 'setPlaying',
                 'setSongDetail',
                 'setListPlay',
                 'setIsFirstPlay',
                 'setCurrentIndex',
                 

            ]),
            selectMusic(id,index){
                this.setFullScreen(true);
                // this.$store.dispatch('setFullScreen',true);
                this.setPlaying(true);
                // if(this.isFirstPlay){
                    this.setIsFirstPlay(false);
                    let ids=this.playlist.map(function(value){
                        return value.id
                    });
                    //ids已经是一个数组了
                    this.setSongDetail(ids);
            // }
                this.setCurrentIndex(index);
            },
            selectAllMusic(){
                this.setFullScreen(true);
                // this.setMiniPlayer(false);
                this.setPlaying(true);
                let ids=this.playlist.map(function(value){
                    return value.id
                });
                // console.log(ids);
                //ids已经是一个数组了
                this.setSongDetail(ids);

            }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.detail-bottom{
    width: 100%;
    li{
        width: 100%;
        padding:20px;
        height: 120px;
        box-sizing: border-box;
        @include bg_sub_color();
        border-bottom: 1px solid #cccccc;
    }
    .bottom-top{
        display: flex;
        align-items: center;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
        .bottom-icon{
            width: 60px;
            height: 60px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 20px;
        }
        .bottom_title{
            @include font_color();
            @include font_size($font_large);

        }
    }
    .item{
        h3{
            @include font_size($font_medium);
             @include clamp(1);
        }
        p{
            @include font_size($font_small);
             @include clamp(1);
            margin-top: 10px;
            opacity: 0.8;
        }   
    }

}
</style>
