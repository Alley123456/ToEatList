<template>
  <!-- calc(100% - 20px)  -->
  <div style="width: 110%">
    <el-header> <Addlist></Addlist></el-header>
    <el-main> <Showlist></Showlist></el-main>
  </div>
</template>

<script setup>
import Addlist from "./AddList.vue";
import Showlist from "./ShowList.vue";
</script>
