<template>
  <div class="detailContainer">
    <div class="header">
      <div class="title">List of points</div>
      <div class="flex_box">
        <div class="left_pan">
          <div class="tit">my points</div>
          <div class="num">{{ overview.total_points }}</div>
          <router-link to="/account/index"><div class="btn">earn points</div></router-link>
        </div>
        <div class="right_pan">
          <div class="tit">Statistics for the last six months</div>
          <div>Stored file rebates</div>
          <div class="num">+{{ overview.file_points }}</div>
        </div>
        <div class="left_pan"><svg-icon icon-class="ic_wenhao" /><router-link to="/integral/rules">What are points?</router-link></div>
      </div>
    </div>
    <div class="switchCard">
      <div class="flex_box_btw">
        <div>Points Earning Details</div>
      </div>
      <div>
        <el-table :data="pointsList" border stripe>
          <el-table-column label="time" prop="created_time" />
          <el-table-column label="income" prop="point_value" />
          <el-table-column label="detailed description" prop="point_detail" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getPointsOverview, getPointsList } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pointsList: [],
      overview: {}
    }
  },
  created() {
    this.getTableList()
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async getTableList() {
      this.pointsList = (await getPointsList({})).data.list
      this.overview = (await getPointsOverview({})).data
    }
  }
}
</script>

<style lang="scss" scoped>
.detailContainer {
  .header {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .info {
      display: flex;
      div {
        margin: 20px 30px 20px 0;
      }
    }
    .flex_box {
      display: flex;
    }
    .left_pan {
      margin: 10% 15%;
      .tit {
        font-size: 26px;
      }
      .num {
        font-size: 36px;
        font-weight: bold;
        margin: 20px 0;
      }
      .btn {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 5px 10px;
      }
    }
    .right_pan {
        margin: 10% 0;
      .tit {
        font-size: 26px;
        margin:0 0 10px;
      }
      .num {
        font-size: 36px;
        font-weight: bold;
        margin: 20px 0;
      }
    }
  }
  .el-button {
    .svg-icon {
    }
  }
  .switchCard {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    margin: 10px 0 0;
    .content_left_btns {
      width: 200px;
      .refush {
        color: #ffffff;
      }
      .svg-icon {
        margin-right: 15px;
      }
    }
    .content_right_btns {
      clear: both;
      .svg-icon {
        margin-right: 15px;
        font-size: 32px;
      }
      .float_box_right {
        margin: 10px 0;
        float: right;
        display: flex;
      }
      .search_btn {
        clear: both;
        position: relative;
        .el-input {
          width: 400px;
          padding: 0 45px;
        }
        .search_icon {
          position: absolute;
          right: -5px;
          width: 50px;
          text-align: center;
          height: 100%;
          background-color: #0079fe;
          border-radius: 0 4px 4px 0;
        }
        .svg-icon {
          font-size: 25px;
          margin: 8px 5px;
          vertical-align: middle;
          color: #fff;
        }
      }
    }
    .el-table {
      margin: 30px 0;
    }
  }
  .setting {
    .item {
      width: 100%;
    }
    .title {
      border: 1px solid #f0f0f0;
      font-size: 18px;
      padding: 15px 10px;
    }
    .svg-icon {
      width: 15px;
    }
    .flex_box {
      display: flex;
      align-items: center;
    }
    .form {
      padding: 0 20px;
      height: 100px;
      .el-input {
        width: 120px;
        margin: 0 20px;
      }
    }
  }
  .btn_save {
    margin: 40px auto;
    text-align: center;
  }
  .local {
    display: flex;
  }
}
</style>
