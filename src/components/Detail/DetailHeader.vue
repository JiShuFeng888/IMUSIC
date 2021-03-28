<!--  -->
<template>
    <Header class="header">
        <div slot="left" class="header-left" @click.stop="back"></div>
        <div slot="center" class="header-title">{{title}}</div>
        <div title slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from './../Header'
import {mapActions} from 'vuex'
    export default {
        name:'detailHeader',
        props:{
            title:{
                type:String,
                default:"",
                // require:true
            }
        },
        data () {
            return {
               
            };
        },
        components: {
            Header,

        },
        computed: {},
        beforeMount() {},
        mounted() {
        },
        methods: {
            back(){
                window.history.back();
                this.setIsComment(false);
            },
           ...mapActions([
            
                'setIsComment'
            ]),
        },
        watch: {}
    }

</script>

<style lang='scss' scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
    overflow: hidden;
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
