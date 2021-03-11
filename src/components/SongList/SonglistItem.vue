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
import {mapActions, mapGetters} from 'vuex';
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
                'historyList'

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
                'setCurrentIndex'
            ]),
            
            selectMusic(id,index){
                let ids=this.songs.map(function(value){
                        return value.id;
                    })  
                this.setSongDetail(ids);
                this.setPlaying(true);
                this.setCurrentIndex(index);
                this.setFullScreen(true)
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
                }
                p{
                    @include font_size($font_medium);
                    margin-top: 20px;
                    @include font_color();
                }
            }
        }
    }
    
</style>
