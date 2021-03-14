<template>
    <Header class="header">
        <div slot="left" class="header-left"></div>
        <p slot="center" class="header-title">IMUSIC</p>
        <div slot="right" class="header-right" @click.stop="accountClick"></div>
    </Header>
</template>

<script>
import Header from './Header'
    export default {
        name:'',
        props:[''],
        data () {
            return {

            };
        },
        components: {
            Header,

        },
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {
                 accountClick(){
                     this.$router.push('/account');
                 },

        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';
.header{
    .header-left{
      @include bg_img('../assets/images/logo');
    }
    .header-right{
      @include bg_img('../assets/images/account')
    }
    .header-title{
      text-align: center;
      line-height: 100px;
      color: #fff;
      @include font_size($font_medium)
    }
  }
</style>