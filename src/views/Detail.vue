<!--  -->
<template>
    <div class="detail">
        <sub-header :title="playlist.name"></sub-header>
        <Detailtop :img="playlist.coverImgUrl" ref="top"></Detailtop>
        <div class="bottom">
        <Scrollview ref="scrollview">
        <Detailbottom :playlist="playlist.tracks"></Detailbottom>
        </Scrollview>
        </div>
    </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader.vue'
import { getPlayList, getAlbumList, getArtistSongs, getTopList } from '../api/index'
import Detailtop from '../components/Detail/Detailtop.vue'
import Detailbottom from '../components/Detail/Detailbottom.vue'
import Scrollview from '../components/Scrollview'
export default {
  name: '',
  props: [''],
  data () {
    return {
      playlist: {}
    }
  },
  components: {
    SubHeader,
    Detailtop,
    Detailbottom,
    Scrollview

  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
          // console.log(this.playlist);
          // console.log(this.$route);
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbumList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistSongs({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {},
  beforeMount () {},
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY);
      if (offsetY > 0) {
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      } else {
        //  let scale=20*Math.abs(offsetY)/defaultHeight
        // this.$refs.top.$el.style.filter=`blur(${scale}px)`
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changemask(scale)
      }
    })
  },
  methods: {},
  watch: {}

}

</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';
.detail{
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1999;
    .bottom{
         @include bg_sub_color();
        position: fixed;
        top: 500px;
        left: 0;
        right: 0;
        bottom: 0;
    }
}

</style>
