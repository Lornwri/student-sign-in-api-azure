<script setup>
import studentRow from "./StudentRow.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../stores/StudentStore.js";

const studentStore = useStudentStore();
const { sortedStudents, studentCount } = storeToRefs(studentStore);

const arrivedOrLeft = (student, isStudentPresent) => {
  student.present = isStudentPresent;
  studentStore.arrivedOrLeft(student);
};

const deleteStudent = (student) => {
  studentStore.deleteStudent(student);
};

const pluralStudentMessage = computed(() => {
  if (studentCount.value === 1) {
    return "There is 1 student in class.";
  } else {
    return `There are ${studentCount.value} students in class.`;
  }
});
</script>



<template>
  <!-- Show the list of students -->
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5>{{ pluralStudentMessage }}</h5>

    <div id="student-table">
      <table class="table">
        <thead>
        <tr class="align-middle">
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete</th>
        </tr>
        </thead>

        <tbody>
        <!-- Loop through students and display each with their info -->
        <tr
            v-for="student in sortedStudents"
            :key="student.starID"
            class="align-middle"
            :class="{ present: student.present, absent: !student.present }"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.starID }}</td>
          <td>
            <!-- Checkbox to mark a student as present or not -->
            <input
                type="checkbox"
                :checked="student.present"
                @change="arrivedOrLeft(student, $event.target.checked)"
            />
            <span class="mx-3" v-if="student.present">Here!</span>
            <span class="mx-3" v-else>Not present</span>
          </td>
          <td>
            <!-- Delete button for each student -->
            <button class="btn btn-danger" @click="deleteStudent(student)">
              <i class="bi bi-trash-fill"></i> Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<style scoped>
#student-table {
  max-height: 400px;
  overflow-y: auto;
}

th {
  width: 25%;
}

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}
</style>

