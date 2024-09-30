<template>
  <!-- calc(100% - 20px)  -->
  <div style="width: 110%">
    <el-header> <AddList></AddList></el-header>
    <el-main> <ShowList></ShowList></el-main>
  </div>
</template>

<script setup>
import AddList from "./AddList.vue";
import ShowList from "./ShowList.vue";
</script>
