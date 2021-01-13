<!--  -->
<template>
    <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
    export default {
        name:'',
        props:[''],
        data() {
            return {
            wiperOption: {
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
                //当数据是异步加载的时候
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
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {}

    }

</script>

<style lang='' scoped>

</style>