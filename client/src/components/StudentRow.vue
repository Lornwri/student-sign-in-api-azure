<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  student: Object,
});

const emit = defineEmits(['arrived-or-left', 'delete-student']);

// Reactive for presence
const isStudentPresent = ref(props.student.present);


const notifyArrivedOrLeft = () => {
  emit('arrived-or-left', props.student, isStudentPresent.value);
};

// Confirm before deleting a student
const confirmThenDeleteStudent = () => {
  if (confirm(`Delete ${props.student.name}?`)) {
    emit('delete-student', props.student);
  }
};
</script>


<template>
  <tr class="align-middle" :class="{ present: student.present, absent: !student.present }">
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <!-- Checkbox for presence -->
      <label>
        <input
            type="checkbox"
            v-model="isStudentPresent"
            @change="notifyArrivedOrLeft"
        />
        <span v-if="student.present" class="mx-3">Here!</span>
        <span v-else class="mx-3">Not present</span>
      </label>
    </td>
    <td>
      <!-- Delete button -->
      <button class="btn btn-danger" @click="confirmThenDeleteStudent">
        <i class="bi bi-trash-fill"></i> Delete
      </button>
    </td>
  </tr>
</template>



<style scoped>
.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}
</style>
