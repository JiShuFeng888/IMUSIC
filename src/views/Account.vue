<!--  -->
<template>
    <transition appear>
        <div class="account">
            <AccountHeader @switchNum="switchNum"></AccountHeader>
            <AccountBottom :num="num"></AccountBottom>
        </div>
    </transition>
</template>

<script>
import AccountHeader from './../components/Account/AccoutHeader'
import AccountBottom from './../components/Account/AccountBottom'
import MetaInfo from './../../vue-meta-info'
     export default {
        metaInfo:MetaInfo.account,
        name:'',
        props:[''],
        data () {
            return {
                num:0,
            };
        },
        components: {
            AccountHeader,
            AccountBottom
        },
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {
            switchNum(num){
                this.num=num;
            }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.account{
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}




















.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0%);
}
.v-enter-active{
    transition: all 0.5s;
}
.v-leave{
        transform: translateX(0%);
}
.v-leave-to{
        transform: translateX(100%);
}
.v-leave-active{
    transition: all 0.5s;
}
</style>