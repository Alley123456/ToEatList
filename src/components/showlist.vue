<template>
    <el-table :data="tableData" max-height="500">
      <el-table-column prop="name" label="Name" width="220" />
      <el-table-column prop="address" label="Address" width="390" />
      <el-table-column fixed="right" label="Operations" width="110">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useTipsStore } from '../store/tipStore';
  
  const tipsStore  = useTipsStore ()
  const tableData = ref([])
  tableData.value = tipsStore.tipsList
  
  const deleteRow = (index: number) => {
    tipsStore.delTips(index)
  }
  
  
  </script>
  