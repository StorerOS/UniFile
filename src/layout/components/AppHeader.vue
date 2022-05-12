<template>
  <div class="header">
    <div class="header__home" @click="$router.push('/')">
      <!-- <img src="@/assets/logo.png" class="header__logo__image" alt="logo"> -->
      <h3 class="header__title">{{ title }}</h3>
    </div>
    <div class="header__operation">
      <!-- <div class="header__operation__btn" @click="refresh"><i class="el-icon-refresh-right" /></div> -->
      <!-- <screenfull class="header__operation__btn" /> -->

      <!-- <div class="header__operation__btn header__user">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="header__user__wrapper">
            <i class="el-icon-user" />
            {{ userInfo && userInfo.user_name }}
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPermissionsFirstRouterPath } from '@/router/index'
import { MANAGEMENTTYPE } from '@/const'
import { title } from '@/settings'
import { getRouteEnds } from '@/router/index'

export default {
  name: 'AppHeader',
  data() {
    return {
      alertTotal: 0,
      title
    }
  },
  computed: {
    ...mapGetters([
      'permissionsRoutes',
      'managementType',
      'userInfo'
    ]),
    isPlatformRoutes() {
      const platform = getRouteEnds(this.permissionsRoutes, MANAGEMENTTYPE.PLATFORM) || {}
      return platform.children && platform.children.length > 0
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    },
    management(type) {
      this.$store.dispatch('app/toggleEnds', type)

      const toPath = getPermissionsFirstRouterPath(this.permissionsRoutes)
      toPath && this.$router.push(toPath)
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
  .header__operation__btn{
    position: relative;
    .num{
      position:absolute;
      width: 15px;
      height: 15px;
      font-size: 12px;
      text-align: center;
      line-height: 17px;
      border-radius: 50%;
      background-color: red;
      color: #ffffff;
      top: 5px;
      right: 0;
    }
  }

.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px 20px;
  z-index: 99;
  box-shadow: rgba(204, 204, 204, 0.2) 0px 3px 2px;
  background-color: #ffffff;
  &__home, &__ends {
    float: left;
  }
  &__home {
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__logo {
    height: 34px;
    width: 22px;
    border: 4px solid $colorPrimary;
    &__image {
      width: 49px;
    }
  }
  &__title {
    font-size: $fontSizeLarge;
    font-weight: 700;
    margin-left: 20px;
    color: $colorPrimary;
  }
  &__ends {
    height: 40px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    &__btn {
      margin-left: 50px;
      color: $colorTextPrimary;
      &:hover {
        color: $colorPrimaryHover;
      }
      &.active {
        color: $colorPrimary;
      }
    }
  }
  &__operation {
    float: right;
    font-size: $fontSizeLarge;
    display: flex;
    &__btn {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 10px;
      margin: 0px 10px;
      cursor: pointer;
    }
    :last-of-type {
      margin-right: 0;
    }
  }
  &__user {
    &__wrapper {
      .el-icon-user {
        font-size: $fontSizeLarge;
      }
    }
  }
  .avatar-container {
    height: 100%;
    ::v-deep .header__user__wrapper {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
