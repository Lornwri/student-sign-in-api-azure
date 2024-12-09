<script setup>
import { ref } from 'vue';
import { useStudentStore } from '../stores/StudentStore';

const studentStore = useStudentStore();

// Reactive variables for student form inputs
const newStudentName = ref('');
const newStarID = ref('');

const formErrors = ref([]);

const addStudent = () => {
  formErrors.value = []; // Clear previous errors

  // Validate required fields
  if (!newStudentName.value) {
    formErrors.value.push('Student name must be entered');
  }

  if (!newStarID.value) {
    formErrors.value.push('StarID must be entered');
  }

  // If there are no errors then add student to the list
  if (formErrors.value.length === 0) {
    let student = {
      name: newStudentName.value.trim(),
      starID: newStarID.value.trim(),
      present: false,
    };

    studentStore.addNewStudent(student);

    // Clear form inputs
    newStudentName.value = '';
    newStarID.value = '';
  }
};
</script>



<template>
  <!-- Display form errors -->
  <div id="new-student-form-errors" class="m-2">
    <div class="alert alert-danger" v-if="formErrors.length > 0">
      <ul>
        <li v-for="(error, index) in formErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>

  <!-- Add a new student -->
  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <input
          id="name"
          class="form-control"
          v-model.trim="newStudentName"
          placeholder="Enter student name"
      />
    </div>
    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <input
          id="starID"
          class="form-control"
          v-model.trim="newStarID"
          placeholder="Enter Star ID"
      />
    </div>

    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
  </div>
</template>



<style scoped>

</style>