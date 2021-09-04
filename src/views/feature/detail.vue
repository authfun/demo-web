<template>
  <div class="app-container">
    <h1>Feature: {{ detail && detail.name || '' }}</h1>
    <div><el-switch v-model="implicit" active-color="#13ce66" active-text="implicit" @change="switchChange" /></div>
    <h3>Menu List</h3>
    <el-table
      v-loading="listLoading"
      :data="detail && detail.menus || []"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
    </el-table>

    <h3>Api List</h3>
    <el-table
      v-loading="listLoading"
      :data="detail && detail.apis || []"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Method" align="center">
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column label="Route" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.route }}</span>
        </template>
      </el-table-column>
    </el-table>

    <h3>Feature List</h3>
    <el-table
      v-loading="listLoading"
      :data="detail && detail.features || []"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDetail } from '@/api/feature'

export default {
  data() {
    return {
      detail: null,
      listLoading: true,
      implicit: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const id = this.$route.params.id
      getDetail(id, this.implicit).then(response => {
        this.detail = response
        this.listLoading = false
      })
    },
    switchChange() {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
