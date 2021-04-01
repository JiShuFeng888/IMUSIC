<!--  -->
<template>
  <div class="singer">
    <div class="singer-wrapper">

      <Scrollview ref="scroll">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
            <h2 class="group-title">{{ keys[index] }}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.picUrl" alt="">
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </Scrollview>
      <ul class="nav">
        <li v-for="(key,index) in keys" :key="key" @click.stop="selectKey(index)"
            :class="{'active':currentIndex===index}"
            :data-index=index
            @touchstart.stop.prevent="touchstart"
            @touchmove.stop.prevent="touchmove"
        >
          {{ key }}
        </li>
      </ul>
      <div class="fix-title" v-show="fixtitle!==''" ref="fixTitle">{{ fixtitle }}</div>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { getAllArtist } from './../api/index'
import Scrollview from '../components/Scrollview'

export default {
  name: 'Singer',
  props: [''],
  data () {
    return {
      list: [],
      keys: [],
      groupTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0

    }
  },
  components: {
    Scrollview

  },
  computed: {
    fixtitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  beforeMount () {
  },
  created () {
    getAllArtist().then((result) => {
      // console.log(result);
      this.keys = result.keys
      this.list = result.list
      // console.log(this.list);
    })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    this.$refs.scroll.scrolling((y) => {
      this.scrollY = y
      if (y > 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        const prevTop = this.groupTop[i]
        const nextTop = this.groupTop[i + 1]
        if (-y >= prevTop && -y <= nextTop) {
          this.currentIndex = i

          // 1.用下一组标题的偏移位+当前的滚动出去的偏移位
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算结果是否是0到60
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            // 需要移动
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transfrom = `translateY(${fixTitleOffsetY}px)`

          return
        }
      }
      // 处理最后的区域
      this.currentIndex = this.groupTop.length - 1
    })
  },
  methods: {
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    },
    touchstart (e) {
      const index = parseInt(e.target.dataset.index)
      this._selectKey(index)

      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      // 偏移多少个index //巧妙的设计
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length) {
        index = this.keys.length - 1
      }
      this._selectKey(index)
    },
    _selectKey (index) {
      this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.groupTop[index], 500)
    }
  },
  watch: {
    // 难点
    list () {
      this.$nextTick(function () {
        this.$refs.group.forEach((value) => {
          this.groupTop.push(value.offsetTop)
        })
      })
    },
    fixTitle () {
      this.$nextTick(function () {
        this.fixTitleHeight = this.$ref.fixTitle.offsetHeight
      })
    }

  }
}
</script>

<style lang='scss' scoped>
@import '../assets/css/mixin.scss';

.singer {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .singer-wrapper {
    width: 100%;
    height: 100%;
    @include bg_sub_color();

    .list-wrapper {
      .list-group {
        .group-title {
          display: flex;
          align-items: center;
          @include bg_color();
          @include font_size($font_large);
          color: #fff;
          padding: 10px 50px;
          box-sizing: border-box;
        }

        .group-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 150px;
          line-height: 100px;
          border-bottom: 1px solid #ccc;

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 30px;
            margin-left: 30px;
          }
        }
      }
    }

    .nav {
      position: fixed;
      right: 10px;
      top: 20%;

      li {
        @include font_color();
        @include font_size($font_medium_s);
        margin-bottom: 10px;

        &.active {
          color: #d43c33;
        }
      }
    }

    .fix-title {
      position: fixed;
      top: 184px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      @include bg_color();
      @include font_size($font_large);
      color: #fff;
      padding: 10px 50px;
      box-sizing: border-box;

    }
  }
}

.v-enter {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0%);
}

.v-enter-active {
  transition: all 0.5s;
}

.v-leave {
  transform: translateX(0%);
}

.v-leave-to {
  transform: translateX(100%);
}

.v-leave-active {
  transition: all 0.5s;
}
</style>
