<template>
  <div class="detailContainer">
    <div class="header">
      <div class="title">List of points</div>
      <div class="tip">
        <div>
          Points are the points given by UniFile users after they store files on the UniFile website (https://unifile.storeros.com). Points can only be used on the UniFile platform. The current version of points is only for rewards. Specific usage rules
        </div>
        <div>Will be in V1.2 version.</div>
        <div>Users will be given 100 points for every 1G of files stored on the platform, and there is no upper limit.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  }
  .tip{
      line-height: 50px;
  }
}
</style>
