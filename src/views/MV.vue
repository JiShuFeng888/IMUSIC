<template>
    <div class="mv">
        <div class="mv-wrapper">
        <ScrollView>
            <ul>
                <li class="mv-item" v-for="(value) in mvsongs" :key="value.id" @click="selectMv(value.id)">
                    <div class="item-top">
                        <img :src="value.cover" alt="" class="mask">
                        <span class="logo"><p>MV</p></span>
                        <div class="content">
                            <img :src="value.cover" alt="" class="">
                        </div>
                    </div>
                    <div class="item-bottom">
                        <p class="title">{{value.mv.title}}</p>
                        <p class="playcount">{{value.playCount|formartNum}}</p>
                    </div>
                </li>
            </ul>
        </ScrollView>
        </div>
        <transition>
            <router-view>

            </router-view>
        </transition>
    </div>
</template>

<script>
import { getFormattedNumber } from '../tools/tools'
import { getMvSongs } from './../api/index'
import ScrollView from '../components/Scrollview'

export default {
  name: '',
  props: [''],
  data () {
    return {
      mvsongs: []
    }
  },
  components: {
    ScrollView
  },
  computed: {},
  beforeMount () {},
  mounted () {},
  methods: {
    selectMv (id) {
      this.$router.push({
        path: `/mv/mvdetail/${id}/`
      })
    }
  },
  watch: {},
  created () {
    getMvSongs()
      .then((result) => {
        this.mvsongs = result.data
        // console.log(this.mvsongs);
      })
      .catch((error) => {
        console.log(error)
      })
  },
  filters: {
    // key: 过滤器名称
    // value: 过滤器处理函数
    formartNum: getFormattedNumber
  }
}

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';
.mv{
    overflow: hidden;
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    .mv-wrapper{
        width:100%;
        height: 100%;
        @include bg_sub_color();
        ul{
            display: flex;
            justify-content:space-around;
            flex-wrap: wrap;
            padding: 10px;
            padding-top: 20px;
            .mv-item{
                // background-color: black;
                overflow: hidden;
                width: 340px;
                height: 450px;
                border-radius: 30px;
                margin-bottom:30px;
                .item-top{
                    width: 100%;
                    height: 350px;
                    position: relative;
                    overflow: hidden;
                    .mask{
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        filter:blur(15px);
                        // height: 450px;
                        transform:scale(1.2,1.2);
                    }
                    .content{
                        position: absolute;
                        top: 100px;
                        left: 50%;
                        transform:translateX(-50%);
                        img{
                        width:320px;
                        height: 170px;
                        border-radius: 20px;
                        }
                    }
                    .logo{
                        text-align: center;
                        position: absolute;
                        top: 50px;
                        left: 50%;
                        transform:translateX(-50%);
                        width: 70px;
                        height: 40px;
                        line-height: 40px;
                        @include font_size($font_medium_s);
                        border-radius: 20px;
                        background-color: rgba(255,255,255,0.5);
                        p{
                             color:#666;
                        }
                    }
                }
                .item-bottom{
                    width: 100%;
                    height: 100px;
                    background-color: #fff;
                    padding: 10px;
                    .title{
                        color: #000000;
                        @include font_size($font_medium_s);
                        @include clamp(1);
                        margin-bottom: 9px;
                    }
                    .playcount{
                        @include font_size($font_medium_s);
                        @include clamp(1)

                    }
                }
            }
        }
    }
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
