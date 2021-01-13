<!--  -->
<template>
    <div class="recommend">
        
    </div>
</template>

<script>
import {getBanner} from '../api/index.js'
    export default {
        created(){
             getBanner().then(function(data){
                console.log(data);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        name:'',
        props:[''],
        data () {
            return {

            };
        },
        components: {},
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {},
    }

</script>

<style lang='' scoped>

</style>