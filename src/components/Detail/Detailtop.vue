<!--  -->
<template>
    <div class="detail-top">
        <img :src="img" alt="">
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
    export default {
        name:'',
        props:{
            img:{
                type:String,
                default:'',
                require:true
            }
        },
        data () {
            return {

            };
        },
        components: {},
        computed: {},
        beforeMount() {},
        mounted() {
        
        },
        methods: {
              changemask(opacity){
                this.$refs.mask.style.opacity=opacity
            }
        },
        watch: {}

    }

</script>

<style lang='scss' scoped>
.detail-top{
    width: 100%;
    height:500px;
    overflow: hidden;
    position: relative;
    img{
        width: 100%;
    }
    .mask{
        width: 100%;
        height: 100%;
        background-color: #000000;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
    }
}

</style>