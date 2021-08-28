<template>
  <div class="app-container">
    <h1>Menu List</h1>
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
          <el-button type="primary" size="mini" @click="update(row)">
            Update
          </el-button>
          <el-button type="danger" size="mini" @click="del(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isUpdate ? 'Update Menu' : 'Create Menu'" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off" />
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
import { getMenuList, addMenu, updateMenu, delMenu } from '@/api/menu'

export default {
  data() {
    return {
      id: null,
      list: null,
      listLoading: true,
      formVisible: false,
      form: {
        name: null
      },
      isUpdate: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMenuList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    create() {
      this.isUpdate = false
      this.form.name = null
      this.formVisible = true
    },
    update(row) {
      this.id = row.id
      this.isUpdate = true
      this.form.name = row.name
      this.formVisible = true
    },
    submit() {
      if (this.isUpdate === false) {
        addMenu(this.form).then(() => {
          this.$message({
            type: 'success',
            message: 'Create completed'
          })
          this.fetchData()
        })
      } else {
        updateMenu(this.id, this.form).then(() => {
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
        delMenu(row.id).then(() => {
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
