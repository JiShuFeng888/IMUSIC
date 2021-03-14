<!--  -->
<template>
    <div class="app">
      <MainHeader></MainHeader>
      <Tabbar></Tabbar>
      <keep-alive>
      <!-- <keep-alive include="Singer"> -->
      <router-view></router-view>
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

</style>