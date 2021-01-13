<!--  -->
<template>
    <div class="app">
      <Header></Header>
      <Tabbar></Tabbar>
      <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
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