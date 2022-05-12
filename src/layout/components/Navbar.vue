<template>
  <div>
    <div class="navbar">
      <hamburger :is-active="sidebar.opened" class="navbar__hamburger" @toggleClick="toggleSideBar" />
    <!-- <h4 class="navbar__title">{{ title }}</h4> -->
    </div>
    <div v-if="hasTitle" class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  watch: {
    '$route': function(to, from) {
      this.setTitle(to)
    }
  },
  created() {
    this.setTitle(this.$route)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    setTitle(route) {
      this.title = route.meta.title
      this.hasTitle = route.meta.hiddenTitle || false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  padding: 13px 0;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  box-sizing: border-box;
  display: flex;
  &__hamburger {
    height: 100%;
    cursor: pointer;
    display: inline-block;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
  }
  &__title {
    position: relative;
    font-size: $fontSizeMedium;
    // padding: 3px 0px 3px 15px;
    padding: 3px 0px;
    height: 100%;
  }
}
.title{
  padding:30px 40px;
  font-weight: bold;
  font-size: 24px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
