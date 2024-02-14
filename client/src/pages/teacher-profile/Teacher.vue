<script setup>
// Components
import ModulesTab from "../../components/teacher-profile/ModulesTab.vue";
import ModuleEnrollmentsTab from "../../components/teacher-profile/ModuleEnrollmentsTab.vue";
// Store
import { useCredentialsStore } from "../../store/store";
// Helpers
import { formatName } from "../../util/helpers";
</script>
<!--
    TODO: implement features in https://cssweng.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?selectedIssue=SCRUM-24
-->
<template>
    <div class="flex flex-row mt-16 min-h-screen">
        <div class="w-1/6 bg-background_pastel p-4">
            <div id="teacher-info" class="flex flex-col items-center justify-center mb-4">
                <h2>{{ formatName(store.user?.last_name, store.user?.first_name) }}</h2>
                <h2>{{ store.user_id || "Invalid ID" }}</h2>
                <h2>{{ store.user?.email || "Invalid Email" }}</h2>
            </div>
            <!-- drop down -->
            <div class="space-y-2">
                <button
                    @click="gotoStudentRecords()"
                    :class="{
                        'bg-highlight text-white':
                            pageMode === 'modules' || pageMode === 'student-records',
                        'bg-white text-black':
                            pageMode !== 'modules' && pageMode !== 'student-records',
                    }"
                    class="w-full text-left py-2 px-4 border border-gray-300 rounded hover:text-white hover:bg-highlight_hover"
                >
                    Student Records
                </button>
            </div>
        </div>

        <ModulesTab
            v-if="pageMode === 'modules'"
            @select-module="gotoModuleInfo($event)"
        />

        <ModuleEnrollmentsTab
            v-if="pageMode === 'student-records'"
            :module-name="selectedModuleName"
            :school-year="selectedSchoolYear"
            @on-back="gotoStudentRecords()"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Store
            store: useCredentialsStore(),
            // Page mode
            pageMode: 'modules', // 'modules', 'student-records'
            // Data
            selectedModuleName: null,
            selectedSchoolYear: null,
        };
    },
    methods: {
        // Go to student records page
        gotoStudentRecords() {
            this.pageMode = "modules";
        },
        // Go to module info page
        gotoModuleInfo(data) {
            this.selectedModuleName = data.module_name;
            this.selectedSchoolYear = data.school_year;
            this.pageMode = "student-records";
        },
    },
    beforeCreate() {
        // On component mount
        const store = useCredentialsStore();
        // If user is not a teacher
        if (store.account_type !== "teacher") {
            // Redirect to home page
            this.$router.push("/");
        }
    },
};
</script>
