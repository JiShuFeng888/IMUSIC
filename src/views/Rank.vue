<!--  -->
<template>
    <div class="rank">
        <ScrollView>
            <ul class="">
                <li v-for="(value,key) in category.titles" :key="key"> 
                    <h3 class="group-title" v-if="value!=='官方榜'">{{value}}</h3>
                    <!-- <ul class="normal-group" v-if="value==='官方榜'">
                        <li v-for="obj in category[key]" :key="obj.id">
                            <div class="rank-left">
                                <img v-lazy="obj.rank.coverImgUrl" alt="">
                            </div>
                            <div class="rank-right"></div>
                        </li>
                    </ul> -->
                     <ul class="other-group"  v-if="value!=='官方榜'">
                        <li v-for="obj in category[key]" :key="obj.id" @click.stop="selectMusic(obj.id)">
                            <div class="rank-top">
                                <img v-lazy="obj.rank.coverImgUrl" alt="">
                                <p>{{obj.rank.updateFrequency}}</p>
                            </div>
                            <div class="rank-bottom">{{obj.rank.name}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </ScrollView>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {getTopListDetail} from './../api/index'
import ScrollView from '../components/Scrollview'
    export default {
        name:'',
        props:[''],
        data () {
            return {
                category:{},

            };
        },
        components: {
            ScrollView,

        },
        computed: {},
        beforeMount() {},
        mounted() {

        },
        created(){
            getTopListDetail()
                .then((data)=>{
                    this.category=data
                    
                    for(let key in data){
                        if(key==='titles'){
                            return
                       }
                        data[key]=data[key].filter(function(value,index){
                            if(value.rank!==undefined){
                                // console.log(value);
                                return true;
                            }
                        })
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        methods: {
            selectMusic(id){
                this.$router.push(`/rank/detail/${id}/rank`);
            }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';

.rank{
    overflow: hidden;
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .group-title{
    @include font_size($font_large);
    @include font_color();
    font-weight: bold;
    padding: 10px 20px;
    }
    .other-group{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        // align-content:flex-end;
        &:after {content: ""; width: 500px; }
        li{
            padding: 10px 20px;
            box-sizing: border-box; 
            .rank-top{
                position: relative;
                img{
                    width: 200px;
                    height: 200px;
                    border-radius: 10px;
                }
                p{
                    position: absolute;
                    bottom: 10px;
                    left: 25px;
                    color: #fff;
                    @include font_size($font_medium_s);
                    // color: #fff;
                }
            }
            .rank-bottom{
                width: 200px;
                @include no-wrap();
                text-align: center;
                p{
                      @include font_size($font_medium_s);
                      @include font_color();
                      padding: 10px 0;
                }
            }
        }
    }

}
.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0%);
}
.v-enter-active{
    transition: all 0.5s;
}
.v-leave{
        transform: translateX(0%);
}
.v-leave-to{
        transform: translateX(100%);
}
.v-leave-active{
    transition: all 0.5s;
}
</style>