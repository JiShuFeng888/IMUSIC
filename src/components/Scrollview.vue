<!--  -->
<template>
    <div id="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'Scrollview',
  props: [''],
  data () {
    return {

    }
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      // 点击失效问题
      click: true,
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // setTimeout(()=>{
    //     console.log(this.iscroll.maxScrollY);
    //     this.iscroll.refresh();
    //     console.log(this.iscroll.maxScrollY);
    // },3000)
    // 1.创建观察者对象
    // 只要发生变化，就会调用回调函数
    // numation：发生变化的数组
    // Observer:观察者对象
    const observer = new MutationObserver((mutationsList, observer) => {
      this.iscroll.refresh()
    })
    // 2.观察者对象的配置
    // subtree: true观察后代节点
    //   attributes: true,
    const config = { childList: true, subtree: true, attributeFilter: ['height', 'offsetHeight'] }
    // 3.观察者对象(要观察谁,观察的内容)
    observer.observe(this.$refs.wrapper, config)
  },
  components: {},
  computed: {},
  beforeMount () {},
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  },
  watch: {}

}

</script>

<style scoped>
#wrapper{
    height: 100%;
    width: 100%;
}
</style>
