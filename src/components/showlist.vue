<template>
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column fixed="right" label="Operations" min-width="120">
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
  