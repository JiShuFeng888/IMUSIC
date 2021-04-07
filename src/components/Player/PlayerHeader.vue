<!--  -->
<template>
    <div class="header">
        <div class="header-left" @click="closeMusic"></div>
        <div class="header-title">
            <h3>{{currentSong.name}}</h3>
            <p>{{currentSong.singer}}</p>
        </div>
        <div class="header-right" @click.stop="songComments(currentSong.id)">
            <svg t="1617797268528" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10682" width="200" height="200"><path d="M842 182H182c-66 0-120 54-120 120v420c0 66 54 120 120 120h660c66 0 120-54 120-120V302c0-66-54-120-120-120z m30 510c0 33-27 60-60 60H212c-33 0-60-27-60-60V332c0-33 27-60 60-60h600c33 0 60 27 60 60v360z" fill="#ffffff" p-id="10683"></path><path d="M302 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#ffffff" p-id="10684"></path><path d="M512 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#ffffff" p-id="10685"></path><path d="M722 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#ffffff" p-id="10686"></path></svg>
        </div>
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
                'currentSong',
            ])
        },
        beforeMount() {},
        mounted() {
        },
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                'setIsComment'
            ]),
            closeMusic(){
                this.setFullScreen(false);
                this.setMiniPlayer(true);
            },
            songComments(id){
                this.$router.push({
                    path:`/songComment/${id}`
                })   
                this.setIsComment(true);

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
        // @include bg_img('../../assets/images/logo')
        display: flex;
        svg{
            margin-right: 15px;
            width: 100px;
            height: 100px;
        }
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
