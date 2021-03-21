<!--  -->
<template>
    <div class="app">
      <MainHeader></MainHeader>
      <Tabbar></Tabbar>
      <keep-alive>
      <transition appear>
      <!-- <keep-alive include="Singer"> -->
      <router-view></router-view>
      </transition>
      </keep-alive>
      <Player></Player>
    </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'
import Player from './views/Player.vue'
    export default {
        name:'app',
        props:[''],
        data () {
            return {

            };
        },
        components: {
          MainHeader:MainHeader,
          Tabbar:Tabbar,
          Player,
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
@import './assets/css/mixin.scss';
.app{
  @include bg_sub_color();
  // overflow: hidden;
  // border-top-left-radius:30px;
  // border-top-right-radius:30px;
  // border:none;
  overflow: hidden;
}
.v-enter{
    transform: translateY(70%);
}
.v-enter-to{
    transform: translateY(0%);
}
.v-enter-active{
    transition: all 0.75s;
}
.v-leave{
        transform: translateY(0%);
}
.v-leave-to{
        transform: translateY(70%);
}
.v-leave-active{
    transition: all 0.75s;
}
</style>