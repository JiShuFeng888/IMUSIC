<!--  -->
<template>
     <div class="header" @click="changetheme">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <slot name="center"></slot>
        <div class="right">
            <slot name="right"></slot>
        </div>
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
    @include bg-color();
    display: flex;
    justify-content: space-between;
    font-size: 30px; 
    .left,.right{
        margin: 0 10px;
        margin-top: 8px;
        width: 84px;
        height: 84px;
        *{
            width: 100%;
            height: 100%;
        }
    }
}

</style>