<!--  -->
<template>
    <div class="recommend">
        <div class="recommend-wrapper">
        <scrollview>
            <div>
                <Banner :banners="banners"></Banner>
                <Personalized :personalized=personalized title="推荐歌单" @select="fatherSelectItem" :type="'personalized'"></Personalized>
                <Personalized :personalized=albums title="最新专辑" @select="fatherSelectItem" :type="'albums'"></Personalized>
                <Songlist :songs=songs></Songlist>
            </div>
        </scrollview>
        </div>
        <transition>
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {getBanner,getPersonalized,getAlbum,getSong} from '../api/index.js'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/personalized'
import Songlist from '../components/Recommend/Songlist'
import Scrollview from '../components/Scrollview'

    export default {
        created(){
            getBanner().then((data)=>(
                this.banners=data.banners
                ))
            .catch(function(error){
                console.log(error);
            }),
             getPersonalized().then((data)=>(
                this.personalized=data.result
                ))
            .catch(function(error){
                console.log(error);
            }),
            getAlbum().then((data)=>(
                this.albums=data.albums.splice(0,6)
                ))
            .catch(function(error){
                console.log(error);
            }),
            getSong().then((data)=>{
                //  this.songs=data.result  
                let list=[]
                data.result.forEach((value)=>{
                    let obj={};
                    obj.id=value.id;
                    obj.name=value.name;
                    obj.picUrl=value.song.album.picUrl;
                    let singer=''
                    for(let i=0;i<value.song['artists'].length;i++){
                         if(i===0){
                             singer=value.song['artists'][i].name;
                         }else{
                             singer+="-"+value.song['artists'][i].name;
                         }
                    }
                    obj.singer=singer;
                    list.push(obj)
                })
                this.songs=list;

            })
            .catch(function(error){
                console.log(error);
            })
        },
        name:'',
        props:[''],
        data () {
            return {
                banners:[],
                personalized:[],
                albums:[],
                songs:[],
            };
        },
        components: {
            Banner:Banner,
            Personalized:Personalized,
            Songlist:Songlist,
            Scrollview:Scrollview

        },
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {
            fatherSelectItem(id,type){
                this.$router.push({
                    path:`/recommend/detail/${id}/${type}`
                })
            }
        },
        watch: {},
    }

</script>

<style lang='scss' scoped>
.recommend{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    // overflow: hidden;
}
.recommend-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

</style>
<style>
.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0%);
}
.v-enter-active{
    transition: all 1s;
}
.v-leave{
        transform: translateX(0%);
}
.v-leave-to{
        transform: translateX(100%);
}
.v-leave-active{
    transition: all 1s;
}
</style>
