<!--  -->
<template>
        <div class="bottom">    
                <div class="bottom-play" @click="selectAllMusic">
                    <span></span>
                    <span>播放全部</span>
                </div>
                <div class="bottom-wrapper">
                    <ScrollView>
                        <SongList :songs="num===0 ? favoriteList:historyList"></SongList>
                    </ScrollView>
                </div>
        </div>
</template>

<script>
import ScrollView from './../Scrollview'
import SongList from '../../components/SongList/SonglistItem'
import {mapActions,mapGetters,mapMutations} from 'vuex'
    export default {
        name:'',
        props:{
            num:{
                type:Number,
                default:0,
                require:true
            }
        },
        data () {
            return {
                type:0,
            };
        },
        components: {
            ScrollView,
            SongList
        },
        computed: {
            ...mapGetters([
                'historyList',
                'favoriteList',
            ]),

        },
        created(){
        let list= this.historyList.filter(function(value,index){
                        // console.log(value.name);
                        if(value.name!==""){
                            return true;
                        }
                    })
        this.setHistoryList(list)
        },
        beforeMount() {},
        mounted() {},
        methods: {
            ...mapActions([
                'setSongDetail',
                'setPlaying',
                'setFullScreen',
                'setHistoryList',
                'setCurrentIndex'

            ]),
            ...mapMutations([
                    'SET_SONG_DETAIL'
                ]),
            selectAllMusic(){
                let ids=[];
                if(this.num===0){
                    ids=this.favoriteList.map(function(value){
                        return value.id;
                    })  
                    // this.SET_SONG_DETAIL(this.favoriteList)
                }else{
                     ids=this.historyList.map(function(value){
                        return value.id;
                    })
                    // this.SET_SONG_DETAIL(this.historyList)
                }
                this.setSongDetail(ids);
                this.setFullScreen(true);
                this.setCurrentIndex(0);
                this.setPlaying(true)
                }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.bottom{
    position: fixed;
    left: 0;
    top: 100px;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .bottom-play{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        @include border_color();
        box-sizing: border-box;
        border-right: none;
        border-left: none;
        span{
            @include font_color();
            display: inline-block; 
            &:nth-of-type(1){
                margin-right: 30px;
                width: 46px;
                height: 46px;
                @include bg_img('../../assets/images/small_play');
            }
        }
    }
    .bottom-wrapper{
        position: fixed;
        left: 0;
        right: 0;
        top: 200px;
        bottom: 0;
        overflow: hidden;
    }
    }
</style>