<!--  -->
<template>
    <Header class="header">
        <div class="header-left" @click.stop="back" slot="left"></div>
        <ul class="item" slot="center">
            <li @click.stop="setClickNum(0)" :class="{'active':ClickNum===0}">我的喜欢</li>
            <li @click.stop="setClickNum(1)" :class="{'active':ClickNum===1}">播放历史</li></ul>
        <div class="header-right" slot="right"></div>
    </Header>
</template>

<script>
import Header from './../Header'
    export default {
        name:'AccountHeader',
        props:{
            title:{
                type:String,
                default:'',
                require:true
            }
        },
        data () {
            return {
                ClickNum:0,

            };
        },
        components: {
            Header
        },
        computed: {},
        beforeMount() {},
        mounted() {
        },
        methods: {
            setClickNum(num){
                    // window.localStorage.clear();
                    this.ClickNum=num;
                    this.$emit('switchNum',num);
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
@import '../../assets/css/mixin.scss';
.header{
    .header-left{
        @include bg_img('../../assets/images/back')
    }
     .header-right{
        @include bg_img('../../assets/images/more')
    }
    .item{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #fff;
        border-radius: 20px;
        height: 60px;
        margin-top: 20px;
        li{
            height: 60px;
            width: 150px;
            text-align: center;
            line-height: 60px;
            @include font_size($font_medium);
            color: #fff;
            font-weight: bold;
            &:nth-of-type(1){
                border-right: 2px #fff solid;
            }
            &.active{
                background-color:rgba(255, 255, 255, 0.3);
            }
        }
    }
}


</style>
