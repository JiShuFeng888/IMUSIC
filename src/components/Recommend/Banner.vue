<!--  -->
<template>
    <swiper :options="swiperOptions" class="banner">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
        <a :href="value.url">
            <img :src="value.pic" alt="">
        </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
    export default {
        name:'',
         props:{
            banners:{
                type:Array,
                default:()=>[],
                require:true,
            }
        },
        data() {
            return {
                swiperOptions: {
                    loop: true, // 循环模式选项
                    autoplay: {
                    delay: 1000, // 自动切换的时间间隔，单位ms
                    stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
                    },
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination'
                    },
                    //如果数据是从网络上获取的，异步加载的，加入以下配置
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true
                }
            }
        },
        components: {
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        },
        beforeMount() {},
        methods: {},
        watch: {}
    }
</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';
.banner{   
    .item{
        @include bg_sub_color();
        text-align: center;
        img{
            border-radius: 50px;
            width: 95%;
            height: 300px;
        }
    }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin.scss';
.banner{
    .swiper-pagination-bullet{
        width: 16px;
        height: 16px;
        background-color: #fff;
        opacity: 1;
    }
    .swiper-pagination-bullet-active{
        @include bg_color();
    }
}
</style>