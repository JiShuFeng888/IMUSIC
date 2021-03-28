<template>
    <div class="song">
        <div class="song-top">
            <h3>最新音乐</h3>
        </div>
        <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import SongListItem from './../SongList/SonglistItem'
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
        components: {
            SongListItem,
        },
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {
            
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
    @import '../../assets/css/mixin';
.song{
  width: 100%;
  @include bg_sub_color();
  .song-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
}
</style>
