<script setup>
import StudentIDNameTable from "./StudentIDNameTable.vue";
import EnrollmentBillTable from "./EnrollmentBillTable.vue";
import Dropdown from "../../common/Dropdown.vue";
</script>
<template>
  <div class="w-3/4 p-4">
    <h1 class="text-4xl font-bold mb-4">Enrollment Records</h1>
    <div class="flex">
      <Dropdown 
        :options-array="filterOptions"
        @on-select="onSelectFilter($event)"
      />
      <div class="ml-4">
        <Dropdown v-if="this.selectedFilter === 'Module Specific'"
          :options-array="moduleOptions"
          :disabled-options="disabledModuleOptions"
          @on-select="onSelectModule($event)"
        />
      </div>
    </div>
    <br><br>
    <StudentIDNameTable 
      v-if="selectedFilter !== 'Module Specific'"
      :filter="selectedFilter"
    />
    <EnrollmentBillTable 
      v-if="selectedFilter === 'Module Specific' && selectedModule !== null"
      :filter="selectedModule"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Dropdown Options
      filterOptions: ['All Students', 'Currently Enrolled Students', 'Incomplete Students', 'Module Specific'],
      moduleOptions: ['FOUNDATIONAL COURSES', 'Child and Development', 'Assessment of Learning and Development', 'Practicum 1', 'Curriculum in ECE', 'TEACHER\'S TRACK', 'Developmental Reading', 'Application of Teaching Principles in Classroom Management', 'Practicum 1', 'BIBLICAL FOUNDATION', 'Bible Intro', 'Spiritual Formation', 'Holistic and Transformational Ministry', 'ADMIN TRACK', 'Operation & Management', 'Strategic Planning', 'Practicum 2'],
      disabledModuleOptions: ['FOUNDATIONAL COURSES', 'TEACHER\'S TRACK', 'BIBLICAL FOUNDATION', 'ADMIN TRACK'],
      // Dropdown Selections
      selectedFilter: 'All Students',
      selectedModule: 'Child and Development',
    };
  },
  methods: {
    async onSelectFilter(data) {
      // Set selected filter
      this.selectedFilter = data;
      // Reset selected module
      this.selectedModule = 'Child and Development';
    },
    onSelectModule(data) {
      // Set selected module
      this.selectedModule = data;
    },
  },
};
</script>

