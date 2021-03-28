<!--  -->
<template>
    <div class="search">
        <div class="search-box">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
                <input type="text" placeholder="搜索歌曲 歌手 专辑" v-model="keyword" v-throttle="search">
                <span @click.stop="delword">X</span>
        </div>
        <div class="search-suggest" v-show="keyword!==''">
            <ScrollView>
            <ul>
                <li v-for="(value) in songs" :key="value.id" @click.stop="selectMusic(value.id)">
                   <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
                    <p>{{value.name}} - {{value.artists[0].name}}</p>
                </li>
            </ul>
            </ScrollView>
        </div>
        <div class="search-hot">
            <h3>热门搜索</h3>
            <ul>
                <li v-for="value in hots" :key="value.first" @click.stop="selectHot(value.first)">{{value.first}}</li>
            </ul>
        </div>
        <ul class="search-history">
            <li v-for="value in searchHistory" :key="value" @click.stop="selectHistory(value)">
            <div class="history-left">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
                    <p>{{value}}</p>
            </div>
            <div class="history-right">
                       <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
            </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ScrollView from '../components/Scrollview'
import {getSearchList,getSearchHot} from '../api/index'
import {mapActions, mapGetters} from 'vuex';
import {getLocalStorage,setLocalStorage} from '../tools/tools'
    export default {
        name:'',
        props:[''],
        data () {
            return {    
                keyword:'',
                songs:[],
                hots:[],
                searchHistory:[],
            };
        },
        components: {
            ScrollView,
        },
        computed: {},
        beforeMount() {},
        mounted() {},
        created() {
            getSearchHot()
                .then((data)=>{ 
                    this.hots=data.result.hots;
                })
                .catch((err)=>{
                    console.log(err);
                })

            if(getLocalStorage('searchHistory')===undefined||getLocalStorage('searchHistory')===null){
                return
            }
            this.searchHistory=getLocalStorage('searchHistory');
        },
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                'setSongDetail',
                'setPlaying',
                'setCurrentIndex'
            ]),
            delHistory(name){
                this.searchHistory=this.searchHistory.filter(function(value){
                    if(value!==name){
                        return true;
                    }
                })
                setLocalStorage('searchHistory',this.searchHistory)
            },
            selectHistory(name){
                this.keyword=name;
                this.search();
            },
            selectHot(name){
                this.keyword=name;
                this.search();
            },
            selectMusic(id){
                this.setSongDetail([id]);
                this.setPlaying(true);
                this.setFullScreen(true)

                if(this.searchHistory.includes(this.keyword)){
                    return 
                }
                this.searchHistory.push(this.keyword)
                setLocalStorage('searchHistory',this.searchHistory)
                this.keyword=''
            },
            search(){
                getSearchList({keywords:this.keyword})
                    .then((data)=>{
                        // console.log(data);
                        this.songs=data.result.songs;
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            },
            delword(){
                this.keyword=''
            }
        },
        watch: {},
        directives: {
            throttle: {
                // 指令的定义
                inserted: function (el,obj) {
                    let flag =true;
                    el.addEventListener('input',function(){
                        if(!flag){
                            return;
                        }
                        flag = false;
                        setTimeout(function(){
                            flag =true;
                            obj.value();
                        },1000)
                    })
                }
            }
            }

    }

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';
.search{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .search-box{
        position: relative;
        display: flex;
        align-items: center;
        margin: 40px 20px;
        background-color: #ebecec;
        border-radius: 30px;
        img{
            width: 40px;
            height: 40px;
          
            margin-right: 20px;
        }
        input{
            width: 500px;
            flex-grow: 1;
            background-color: transparent;
            height: 60px;
            border: none;
            outline: none;
            @include font_size($font_medium);
        }
        span{
            position:absolute;
            right: 30px;
            top: 50%;
            text-align: center;
            color:#cccccc;
            border: 2px solid #ccc;
            border-radius: 15px;
            transform:translateY(-50%);
            width: 30px;
            height: 30px;
            line-height: 30px;
            display: block;
            @include font_size($font_large);
        }
    }
    .search-suggest{
        overflow: hidden;
    @include bg_sub_color();
        position: fixed;
        left: 0;
        top: 300px;
        bottom: 0;
        right: 0;
        ul{
            li{
            display: flex;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #cccccc;
            img{
                width: 40px;
                height: 40px;
            }
            p{
                margin-left: 20px;
                @include font_size($font_medium);
                @include font_color();

            }
        }
        }
    }
    .search-hot{
        
        h3{
                @include font_size($font_medium);
                @include font_color();
                padding: 10px 20px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin: 20px;
                height: 60px;
                line-height: 60px;
                border-radius: 30px;
                padding:0 20px;
                border:1px solid #ccc;
                 @include font_size($font_medium);
                @include font_color();
            }
        }
    }   
    .search-history{
            padding:0 30px;
        li{
            display:flex;
            justify-content:space-between;
            padding-bottom: 10px;
            margin: 30px 0;
            border-bottom: 1px solid #ccc;
            .history-left{
                display:flex;
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                    p{
                    margin-left: 20px;
                    @include font_size($font_medium);
                    @include font_color();

                }
            }
            .history-right{
                img{
                    margin-top: 8px;
                    width: 30px;
                    height: 30px;
                }                
            }
        }
    }

}

</style>