<script setup>
// Components
import DashboardTab from "../../components/admin-profile/dashboard-tab/DashboardTab.vue";
import EnrollmentRecordsTab from "../../components/admin-profile/enrollment-records-tab/EnrollmentRecordsTab.vue";
import StudentRecordsTab from "../../components/admin-profile/student-records-tab/StudentRecordsTab.vue";
import ModuleStudentRecordsTab from "../../components/admin-profile/student-records-tab/ModuleStudentRecordsTab.vue";
import StudentCard from "../../components/admin-profile/student-card/StudentCard.vue";
// Store
import { useCredentialsStore } from "../../store/store";
</script>
<!--
    TODO: implement features in https://cssweng.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?selectedIssue=SCRUM-24
-->
<template>
    <div class="flex flex-row mt-20 min-h-screen">
        <div class="w-1/6 bg-background_pastel p-4">
            <div id="student-info" class="flex flex-col items-center justify-center mb-4">
                <h2>{{ store.user_id || "Invalid ID" }}</h2>
                <h2>{{ store.user?.email || "Invalid Email" }}</h2>
            </div>
            <!-- drop down -->
            <div class="space-y-2">
                <button
                    @click="gotoDashboard()"
                    :class="{
                        'bg-highlight text-white': pageMode === 'dashboard',
                        'bg-white text-black': pageMode !== 'dashboard',
                    }"
                    class="w-full text-left py-2 px-4 border border-gray-300 rounded hover:text-white hover:bg-highlight_hover"
                >
                    Dashboard
                </button>
                <button
                    @click="gotoEnrollmentRecords()"
                    :class="{
                        'bg-highlight text-white': pageMode === 'enrollment-records',
                        'bg-white text-black': pageMode !== 'enrollment-records',
                    }"
                    class="w-full text-left py-2 px-4 border border-gray-300 rounded hover:text-white hover:bg-highlight_hover"
                >
                    Enrollment Records
                </button>
                <button
                    @click="gotoStudentRecords()"
                    :class="{
                        'bg-highlight text-white': pageMode === 'student-records',
                        'bg-white text-black': pageMode !== 'student-records',
                    }"
                    class="w-full text-left py-2 px-4 border border-gray-300 rounded hover:text-white hover:bg-highlight_hover"
                >
                    Student Records
                </button>
            </div>
        </div>

        <DashboardTab v-if="pageMode === 'dashboard'" />

        <EnrollmentRecordsTab v-if="pageMode === 'enrollment-records'" />

        <StudentCard v-if="pageMode === 'student-card'" :student-id="selectedStudentId" />

        <StudentRecordsTab
            v-if="pageMode === 'student-records'"
            @select-module="gotoModuleStudentRecords($event)"
        />

        <ModuleStudentRecordsTab
            v-if="pageMode === 'module-student-records'"
            :module-name="selectedModuleName"
            :school-year="selectedSchoolYear"
            @on-back="gotoStudentRecords()"
        />
    </div>
</template>

<script>
// Export component script
export default {
    data() {
        return {
            // Store
            store: useCredentialsStore(),
            // Page mode
            pageMode: "dashboard", // 'dashboard', 'enrollment-records', 'student-records', 'module-student-records'
            // Data
            selectedStudentId: "2023-000-000",
            selectedModuleName: null,
            selectedSchoolYear: null,
        };
    },
    methods: {
        // Go to Dashboard tab
        gotoDashboard() {
            this.pageMode = "dashboard";
        },
        // Go to Enrollment Records Tab
        gotoEnrollmentRecords() {
            this.selectedStudentId = null;
            this.selectedModuleName = null;
            this.selectedSchoolYear = null;
            this.pageMode = "enrollment-records";
        },
        // Go to student records tab
        gotoStudentRecords() {
            this.selectedStudentId = null;
            this.selectedModuleName = null;
            this.selectedSchoolYear = null;
            this.pageMode = "student-records";
        },
        // Go to module student records tab
        gotoModuleStudentRecords(data) {
            this.selectedStudentId = null;
            this.selectedModuleName = data.module_name;
            this.selectedSchoolYear = data.school_year;
            this.pageMode = "module-student-records";
        },
        // Go to student card
        gotoStudentCard(data) {
            this.selectedStudentId = data.studentId;
            this.selectedModuleName = null;
            this.selectedSchoolYear = null;
            this.pageMode = "student-card";
        },
    },
    beforeCreate() {
        // On component mount
        const store = useCredentialsStore();
        // If user is not an admin
        if (store.account_type !== "admin") {
            // Redirect to home page
            this.$router.push("/");
        }
    },
};
</script>
