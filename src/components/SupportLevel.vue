<template>
  <div>
    <div class="button">
      <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
      <el-button type="primary" class="edit" @click="New()" round>New</el-button>
    </div>
    <el-table
        :data="elements"
        border
        style="width: 80%;
        margin: 30px auto;"
        :header-cell-style="headClass"
        :cell-style="headClass"
    >
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="desc" label="Description" width="500" />
      <el-table-column prop="price" label="Price" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            Edit
          </el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button
                  size="mini"
                  type="danger"
              >
                Delete
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- New SupportLevel Form -->
    <el-dialog title="Add new support level" v-model="dialogFormVisible">
      <el-form :model="form" label-width="140px" class="form">
        <el-form-item label="Level name" required>
          <el-input v-model="form.name" autocomplete="off" width="120px"></el-input>
        </el-form-item>
        <el-form-item label="Level description" required>
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Level price" required>
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cover image" required>
          <el-upload
              class="upload-demo"
              action=""
              limit="1"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :file-list="fileList"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
export default {
  name: 'SupportLevel',
  props: {
    elements: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      displayOption: false,
      form: {
        name: '',
        description: '',
        price: 0
      },
      fileList: []
    }
  },
  methods: {
    Back() {
      this.$router.go(-1)
    },
    New(){
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.form['name'] = row['name']
      this.form['description'] = row['desc']
      this.form['price'] = row['price']
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      console.log(row['id'])
    },
    // hook function when select file or upload file success or upload file fail
    handleChange() {

    },
    handleExceed() {
      ElMessage.error("You can upload 1 image file at max")
    },
    headClass() {
      return "text-align:center"
    }
  }
}
</script>

<style scoped>
.button {
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form {
  text-align: left;
}

</style>
