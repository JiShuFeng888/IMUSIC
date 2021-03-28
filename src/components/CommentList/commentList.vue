<template>
        <ul class="comments">
                <li v-for="value in comments" :key="value.commentId">
                <div class="comment-top">
                    <div class="top-left">
                        <img class="photo" :src="value.user.avatarUrl">
                        <div class="info">
                            <p class="title">{{value.user.nickname}}</p>
                            <p class="time">{{value.time|formartTime}}</p>
                        </div>
                    </div>
                    <div class="top-right">
                        <p>{{value.likedCount}}</p>
                        <span></span>
                    </div>
                </div>
                <div class="comment-bottom">
                    <p>{{value.content}}</p>
                </div>
                </li>
        </ul>
</template>

<script>
import{getComment} from './../../api/index'
import {mapGetters} from 'vuex'
    export default {
        name:'',
        props:{
            "type":{
                default:'',
                require:true,
                type:String,
            },
        },
        data () {
            return {
                comments:[],
                id:0,
            };
        },
        components: {},
        computed: {
            ...mapGetters([
                'currentSong',
                'isComment'
            ])
        },
        beforeMount() {},
        mounted() {
         
        },
        methods: {

        },
        watch: {
            currentSong:function(newvalue,oldvalue){ 
                    this.id=newvalue.id;
                   
            },
            isComment:function(newvalue,oldvalue){
                if(newvalue===true&&this.id!==0){
                      getComment({id:this.id,type:0,sortType:2})
                                   .then((result)=>{
                                       this.comments=result.data.comments;
                                   })
                                   .catch((error)=>{
                                       console.log(error);
                })
                }
            }

        },
        filters: {
           "formartTime":function(time){
                let  date = new Date(time);
                // console.log(date);
                // console.log(date.getFullYear()); // 返回当前日期的年  2020
                // console.log(date.getMonth() + 1); // 月份 返回的月份小1个月   记得月份+1 呦 11
                // console.log(date.getDate()); // 返回的是 几号 28
                return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"
            }
        },
        created(){
                if(this.type==="mv"){
                    getComment({id:this.$route.params.id,type:1,sortType:2})
                        .then((result)=>{
                            this.comments=result.data.comments;
                            // console.log(this.comments);
                        })
                        .catch((error)=>{
                            console.log(error);
                    })
                }else if(this.type==="song"){
                      getComment({id:this.$route.params.id,type:0,sortType:2})
                        .then((result)=>{
                            this.comments=result.data.comments;
                        })
                        .catch((error)=>{
                            console.log(error);
                    })
                }

            
        }

    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';

    .comments{
        background-color: #fff;
         @include bg_sub_color();
         z-index: 999;
        li{
            border-bottom: 1px solid #ccc;
            padding: 20px;
            padding-top: 30px;
        }
        .comment-top{
            display:flex;
            justify-content:space-between;
            .top-left{
                display:flex;
                justify-content:flex-start;
                img{
                    width: 80px;
                    height: 80px;
                    border-radius:40px;
                }
                .info{
                    display:flex;
                    flex-direction: column;
                    justify-content:center;
                    margin-left: 20px;
                    box-sizing: border-box;
                    .title{
                        margin-bottom: 15px;
                        @include font-size($font_medium_s);
                        color: #000;
                    }
                    .time{
                        color: #666;
                        @include font-size($font_small);
                    }
                }
            }
            .top-right{
                display: flex;
                align-items: center;
                p{
                        @include font-size($font_medium_s);
                        color: #666;
                        margin-right: 10px;
                }
                span{
                    width: 30px;
                    height: 30px;
                    display: inline-block;
                    @include bg_img('../../assets/images/favorite');
                }
            }
        }
        .comment-bottom{
            padding: 20px;
            padding-top: 30px;
            box-sizing: border-box;
            p{
                @include font-size($font_medium);
            }
        }
    }
</style>