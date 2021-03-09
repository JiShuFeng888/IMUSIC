<!--  -->
<template>
    <div class="header" @click="changetheme">
        <div class="header-left" @click.stop="back"></div>
        <div class="header-title">{{title}}</div>
        <div class="header-right"></div>
    </div>
</template>

<script>
    export default {
        name:'SubHeader',
        props:{
            title:{
                type:String,
                default:'',
                require:true
            }
        },
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
            back(){
                window.history.back();
            }
        },
        watch: {}
    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
    width: 100%;
    position: relative;
    z-index: 999;
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
        @include bg_img('../../assets/images/back')
    }
     .header-right{
        @include bg_img('../../assets/images/more')
    }
    .header-title{
        line-height: 100px;
        @include font_size($font-medium);
        color: #ffffff;
        @include no-wrap();
    }
}

</style>
