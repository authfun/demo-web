<template>
  <div class="app-container">
    <h1>Feature List</h1>
    <el-button size="mini" type="success" @click="add">Create</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:20px;"
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
      <el-table-column label="Operation" align="center">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="detail(row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getFeatureList } from '@/api/feature'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getFeatureList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    detail(row) {
      this.$router.push({ name: 'feature-detail', params: { id: row.id }})
    },
    add() {
      this.$router.push({ name: 'feature-add' })
    }
  }
}
</script>
