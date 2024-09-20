<template>
<!-- calc(100% - 20px)  -->
  <div style="width:110%;">
        <el-header> <Addlist></Addlist></el-header>
        <el-main> <Showlist></Showlist></el-main>
  </div>
</template>

<script setup>
import Addlist from './addlist.vue'
import Showlist from './showlist.vue'
</script>