<template>
    <Header class="header">
        <div slot="left" class="header-left" @click.stop="playerClick"></div>
        <p slot="center" class="header-title"></p>
        <div slot="right" class="header-right" @click.stop="accountClick"></div>
    </Header>
</template>

<script>
import Header from './Header';
import{mapActions,mapGetters} from 'vuex';
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
        computed: {
          ...mapGetters([
            'isPlaying'
          ])
        },
        beforeMount() {},
        mounted() {},
        methods: {
          ...mapActions([
            'setFullScreen'
          ]),
          accountClick(){
              this.$router.push('/account');
          },
          playerClick(){
              if(this.isPlaying){
                this.setFullScreen(true);
                console.log("asd ");
              }
          }

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