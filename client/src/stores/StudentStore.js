import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStudentStore = defineStore("student", () => {
    // Initial student list
    const studentList = ref([
        { name: "A. Student", starID: "aa1234aa", present: false },
        { name: "B. Student", starID: "bb1234bb", present: false },
    ]);

    // Most recent student
    const mostRecentStudent = ref({});

    // Add a new student
    function addNewStudent(student) {
        // Prevent duplicate StarIDs
        const isDuplicate = studentList.value.some(s => s.starID === student.starID);
        if (!isDuplicate) {
            studentList.value.push(student);
        } else {
            console.error("Student with the same StarID already exists.");
        }
    }

    // Delete a student
    function deleteStudent(studentToDelete) {
        studentList.value = studentList.value.filter((student) => {
            return student.starID !== studentToDelete.starID;
        });
    }

    // Update presence and mark as most recent
    function arrivedOrLeft(student) {
        const studentToModifyIndex = studentList.value.findIndex((s) => s.starID === student.starID);
        if (studentToModifyIndex !== -1) {
            mostRecentStudent.value = student;
            studentList.value[studentToModifyIndex] = { ...student };
        }
    }

    // Computed: Sorted student list
    const sortedStudents = computed(() => {
        return studentList.value.slice().sort((s1, s2) => {
            return s1.name.localeCompare(s2.name);
        });
    });

    // Computed: Student count
    const studentCount = computed(() => studentList.value.length);

    return {
        // Reactive state
        studentList,
        mostRecentStudent,

        // Actions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        // Computed properties
        sortedStudents,
        studentCount,
    };
});
