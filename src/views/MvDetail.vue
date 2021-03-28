<template>
    <div class="mv-detail">
        <Header></Header>
        <div class="mv-wrapper">
            <div class="mv-middle">
                <video ref="video" :src="mv.url" controls></video>
            </div>
            <div class="mv-bottom">
            <Scrollview>
                <CommentList :type="'mv'"></CommentList>
            </Scrollview>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './../components/Detail/DetailHeader'
import{getMvDetail} from './../api/index'
import Scrollview from '../components/Scrollview'
import CommentList from './../components/CommentList/commentList'
    export default {
        name:'',
        props:[''],
        data () {
            return {
                mv:{},
                switchNum:0,
            
            };
        },
        components: {
            Header,
            Scrollview,
            CommentList,
        },
        computed: {},
        beforeMount() {},
        mounted() {
        },
        methods: {
          
        },
        watch: {},
        created() {
                getMvDetail({id:this.$route.params.id})
                    .then((result)=>{
                        this.mv=result.data
                        // console.log(result.data);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
       
        },



    }

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';

.mv-detail{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // z-index: 998;
    .mv-wrapper{
        width: 100%;
        height: 100%;
        .mv-bottom{
        background-color: #fff;
        overflow: hidden;
        position: fixed;
        top: 500px;
        right: 0;
        left: 0;
        bottom: 0;
    }
        
    }
    .mv-middle{
        width: 100%;
        height: 400px;
        background-color: #fff;
        video{
            vertical-align:top;
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
    }
  


}
</style>