<!--  -->
<template>
     <ul class="song-list">
            <li v-for="(value,index) in songs" :key="value.id" class="item" @click="selectMusic(value.id,index)">
                <img v-lazy="value.picUrl" alt="">
                <div>
                    <h3>{{value.name}}</h3>
                    <p>{{value.singer}}</p>
                </div>
            </li>
        </ul>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex';
    export default {
        name:'SongList',
        props:{
            songs:{
                type:Array,
                default:()=>[],
                require:true
            },
          
        },
        data () {
            return {

            };
        },
        components: {},
        computed: {
            ...mapGetters([
                'favoriteList',
                'historyList',
                'currentIndex',
            ])
        },
        beforeMount() {},
        mounted() {},
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                'setSongDetail',
                'setPlaying',
                'setCurrentIndex',
                'setCurrentSong'
            ]),
            ...mapMutations([
                // 'SET_SONG_DETAIL'
            ]),
            selectMusic(id,index){
                console.log(index);
                let list= this.songs.filter(function(value,index){
                    // console.log(value.name);
                        if(value.name!==""){
                            return true;
                        }
                    })
                let ids=list.map(function(value){
                    return value.id;
                    })  
                this.setSongDetail(ids);
                // this.SET_SONG_DETAIL(list);
                this.setPlaying(true);
                this.setFullScreen(true)
                this.setCurrentIndex(index);
            }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
    @import '../../assets/css/mixin';
    @import '../../assets/css/variable.scss';
    .song-list{
        width: 100%;
        @include bg_sub_color();
        overflow: hidden;
        .item{
            width: 100%;
            height: 200px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            margin-top: 20px;
            border-bottom: 1px solid #cccccc;
            img{
                width: 150px;
                height: 150px;
                border-radius: 20px;
                margin-right: 20px;
            }
            div{
                h3{
                    @include font_size($font_large);    
                    @include font_color();
                    @include clamp(1);
                }
                p{
                    @include font_size($font_medium);
                    margin-top: 20px;
                    @include font_color();
                    @include clamp(1);
                }
            }
        }
    }
    
</style>
