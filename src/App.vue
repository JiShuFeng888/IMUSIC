<!--  -->
<template>
    <div class="app">
      <Header></Header>
      <Tabbar></Tabbar>
      <router-view></router-view>
      <Player></Player>
    </div>
</template>

<script>
import Header from './components/Header'
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
          Header:Header,
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