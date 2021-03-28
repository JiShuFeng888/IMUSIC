<!--  -->
<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{title}}</h3>
        </div>
        <div class="personalized-list">
            <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
                <img v-lazy="value.picUrl" alt="">
                <p>{{value.name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'',
        props:{
            personalized:{
                type:Array,
                default:()=>[],
                require:true,
            },
            albums:{
                type:Array,
                default:()=>[],
                require:true,
            },
            title:{
                type:String,
                default:"",
                require:true
            },
            type:{
                type:String,
                default:"",
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
        mounted() {},
        methods: {
            selectItem(id){
                this.$emit("select",id,this.type)
                
            },
        },
        watch: {}
    }
</script>
<style lang='scss' scoped>
@import '../../assets/css/mixin';
.personalized{
     @include bg_sub_color();
    .personalized-top{
        width: 100%;
        height: 84px;
        line-height: 84px;
        @include bg_sub_color();
        padding: 0 20px;
        border-bottom: 1px solid #cccccc;
        h3{
            @include font_size($font_large);
            font-weight: bold;
            @include font_color();
        }
    }
    .personalized-list{
        display: flex;
        justify-content: space-around;
        width: 100%;
        flex-wrap: wrap;
        padding: 20px 0px;
        .item{
            width: 200px;
            padding-bottom: 20px;
            img{
                width: 200px;
                height: 200px;
                border-radius: 20px;
            }
            p{
                @include clamp(2);
                @include font_color();
                @include font_size($font_medium_s);
            }
        }
    }
}

</style>
