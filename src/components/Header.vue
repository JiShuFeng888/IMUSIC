<!--  -->
<template>
    <div class="header" @click="changetheme">
        <div class="header-left"></div>
        <div class="header-title">MUSIC</div>
        <div class="header-right" @click.stop="accountClick"></div>
    </div>
</template>

<script>
    export default {
        name:'Header',
        props:[''],
        data () {
            return {
                themes:['theme','theme1','theme2'],
                index:0,
            };
        },
        components: {},
        computed: {},
        beforeMount() {},
        mounted() {
        },
        methods: {
               changetheme(){
                this.index++;
                if(this.index>=this.themes.length){
                    this.index=0;
                }
                document.documentElement.setAttribute('data-theme', this.themes[this.index]);
                 },
                 accountClick(){
                     this.$router.push('/account');
                 }
        },
        watch: {}
    }

</script>

<style lang='scss' scoped>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.header{
    width: 100%;
    height: 100px;
    // background-color: #f00;
    @include bg-color();
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    .header-left,.header-right{
        margin-top: 8px;
        width: 84px;
        height: 84px;
    }
    .header-left{
        @include bg_img('../assets/images/logo')
    }
     .header-right{
        @include bg_img('../assets/images/account')
    }
    .header-title{
        line-height: 100px;
        @include font_size($font-medium);
        color: #ffffff;
    }
}

</style>