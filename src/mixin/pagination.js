
/**
 * pagination
 */

export default {
  data() {
    return {
      paginationMixin: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    $_Mixin_search() {
      this.paginationMixin.currentPage = 1
      this.getTableList()
    },
    $_paginationMixin_handleSizeChange(val) {
      this.paginationMixin.pageSize = val
      this.getTableList()
    },
    $_paginationMixin_handleCurrentChange(val) {
      this.paginationMixin.currentPage = val
      this.getTableList(val - 1)
    }
  }
}
