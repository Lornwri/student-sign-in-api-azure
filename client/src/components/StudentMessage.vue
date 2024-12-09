<script setup>

import { useStudentStore } from "../stores/StudentStore.js";
import { storeToRefs } from "pinia";

const studentStore = useStudentStore();
const { mostRecentStudent } = storeToRefs(studentStore);

</script>


<template>

  <div id="welcome-or-goodbye-message" class="m-2">
    <!-- Check if a most recent student exists -->
    <div v-if="mostRecentStudent.name">
      <div
          class="alert"
          :class="{ 'alert-success': mostRecentStudent.present, 'alert-info': !mostRecentStudent.present }"
      >
        <!-- Welcome or Goodbye message -->
        {{ mostRecentStudent.present ? 'Welcome' : 'Goodbye' }}, {{ mostRecentStudent.name }}!
        <span v-if="!mostRecentStudent.present"> See you later!</span>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>