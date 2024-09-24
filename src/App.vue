<script setup>
import Map from "./components/MapFile.vue";
import List from "./components/ListFile.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="550px"><Map></Map></el-aside>
      <el-container>
        <List></List>
      </el-container>
    </el-container>
  </div>
</template>

<!-- <style  scoped>
 
</style> -->
