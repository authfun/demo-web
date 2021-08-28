<template>
  <div class="app-container">
    <h1>Api List</h1>
    <el-button size="mini" type="success" @click="create">Create</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:20px;"
    >
      <el-table-column label="ID" align="center" width="300">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Group" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.group }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Method" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Route" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.route }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Operation" align="center" width="200">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="update(row)">
            Update
          </el-button>
          <el-button type="danger" size="mini" @click="del(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isUpdate ? 'Update Api' : 'Create Api'" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="Group">
          <el-input v-model="form.group" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Method">
          <el-select v-model="form.method" style="width: 100%;">
            <el-option v-for="method in methods" :key="method" :label="method" :value="method" />
          </el-select>
        </el-form-item>
        <el-form-item label="Route">
          <el-input v-model="form.route" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getApiList, addApi, updateApi, delApi } from '@/api/api'

export default {
  data() {
    return {
      id: null,
      list: null,
      listLoading: true,
      formVisible: false,
      form: {
        group: null,
        name: null,
        method: null,
        route: null
      },
      methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT',
        'PATCH'
      ],
      isUpdate: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getApiList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    create() {
      this.isUpdate = false
      this.form.group = null
      this.form.name = null
      this.form.method = null
      this.form.route = null
      this.formVisible = true
    },
    update(row) {
      this.id = row.id
      this.isUpdate = true
      this.form.group = row.group
      this.form.name = row.name
      this.form.method = row.method
      this.form.route = row.route
      this.formVisible = true
    },
    submit() {
      if (this.isUpdate === false) {
        addApi(this.form).then(() => {
          this.$message({
            type: 'success',
            message: 'Create completed'
          })
          this.fetchData()
        })
      } else {
        updateApi(this.id, this.form).then(() => {
          this.$message({
            type: 'success',
            message: 'Update completed'
          })
          this.fetchData()
        })
      }
      this.formVisible = false
    },
    del(row) {
      this.$confirm('Are you sure to delete', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delApi(row.id).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          })
          this.fetchData()
        })
      })
    }
  }
}
</script>
