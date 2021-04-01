<template>
    <div class="comment" v-show="isComment">
        <Header :title="this.currentSong.name"></Header>
        <div class="comment-wrapper">
                <ScrollView ref="scroll">
                    <CommentList :type="'song'"></CommentList>
                </ScrollView>
        </div>
    </div>
</template>

<script>
import Header from './../components/Detail/DetailHeader'
import CommentList from './../components/CommentList/commentList'
import ScrollView from '../components/Scrollview'
import { mapGetters } from 'vuex'

export default {
  name: '',
  props: [''],
  data () {
    return {

    }
  },
  components: {
    Header,
    CommentList,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isComment'
    ])
  },
  beforeMount () {},
  mounted () {},
  methods: {

  },
  watch: {

  }

}

</script>

<style lang='scss' scoped>
.comment{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
        background-color: #fff;
    .comment-wrapper{
       position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
}

</style>
