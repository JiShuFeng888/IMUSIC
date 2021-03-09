<!--  -->
<template>
    <div class="header">
        <div class="header-left" @click="closeMusic"></div>
        <div class="header-title">
            <h3>{{currentSong.name}}</h3>
            <p>{{currentSong.singer}}</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

    export default {
        name:'PlayHeader',
        props:{
            title:{
                type:String,
                default:'',
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
                'currentSong'
            ])
        },
        beforeMount() {},
        mounted() {
        },
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
            ]),
            closeMusic(){
                this.setFullScreen(false);
                this.setMiniPlayer(true);
            }
        },
        watch: {}
    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
    width: 100%;
    position: relative;
    z-index: 999;
    height: 100px;
    // background-color: #f00;
    // @include bg-color();
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    .header-left,.header-right{
        margin-top: 8px;
        width: 84px;
        height: 84px;
    }
    .header-left{
        @include bg_img('../../assets/images/down')
    }
    .header-right{
        // @include bg_img('../../assets/images/more')
    }
    .header-title{
        display: flex;
        justify-content: center;
        flex-direction:column;
        align-items: center;
        @include font_size($font-medium);
        color: #ffffff;
        @include no-wrap();
    }
}

</style>
