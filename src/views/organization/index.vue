<template>
  <div class="dashboard-container">
    <el-form :inline="true">
      <el-form-item label="Tanent">
        <el-select v-model="tenant" placeholder="Please select..." @change="tenantSelected">
          <el-option v-for="item in tenants" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <el-tree :data="treeData" :props="treeProps" node-key="id" empty-text="No tanent choosed" @node-click="treeNodeClick" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <h5>Role List</h5>
          <el-table :data="detail && detail.roles || []" empty-text="No roles" :show-header="false">
            <el-table-column label="Name" align="center">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <h5>User List</h5>
          <el-table :data="detail && detail.users || []" empty-text="No users" :show-header="false">
            <el-table-column label="Name" align="center">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getTenantOptions } from '@/api/tenant'
import { getOrganizationTree, getDetail } from '@/api/organization'

export default {
  data() {
    return {
      tenant: '',
      tenants: [],
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      detail: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTenantOptions().then(response => {
        this.tenants = response
      })
    },
    tenantSelected(value) {
      getOrganizationTree(value).then(response => {
        this.treeData = response
      })
    },
    treeNodeClick(node) {
      getDetail(node.id).then(response => {
        this.detail = response
      })
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
