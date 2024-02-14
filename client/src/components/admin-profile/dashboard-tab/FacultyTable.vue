<script setup>
import { formatDate, formatName, formatEnum } from "@/util/helpers";
import MessagePopup from "../../common/MessagePopup.vue";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
</script>

<template>
    <LoadingSpinner v-if="!render" />
    <div v-else
        class="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto max-h-96">
        <table class="w-full text-gray-500 dark:text-gray-400 text-xl text-center">
            <thead
                class="text-xs text-white uppercase bg-highlight dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Date Requested</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="facultyArray === null || facultyArray.length === 0"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        No Teachers Found
                    </th>
                </tr>
                <tr
                    v-for="(teacher, index) in facultyArray"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {{ formatName(teacher.last_name, teacher.first_name) }}
                    </th>
                    <th
                        scope="row"
                        class="px-6 py-3 font-medium"
                        v-if="teacher.status === 'FOR_APPROVAL'"
                    >
                        {{ formatDate(teacher.created_at) }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium" v-else>
                        {{ formatDate(teacher.created_at) }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium">
                        {{ formatEnum(teacher.status) }}
                    </th>
                    <td class="px-6 py-4" v-if="teacher.status === 'FOR_APPROVAL'">
                        <span
                            @click="
                                accept(
                                    teacher.teacher_id,
                                    formatName(teacher.last_name, teacher.first_name),
                                    index
                                )
                            "
                            class="font-medium text-highlight_hover dark:text-highlight_hover hover:underline"
                        >
                            Accept
                    </span>
                        <span>/</span>
                        <span
                            @click="
                                reject(
                                    teacher.teacher_id,
                                    formatName(teacher.last_name, teacher.first_name),
                                    index
                                )
                            "
                            class="font-medium text-highlight_hover dark:text-highlight_hover hover:underline"
                        >
                            Reject
                        </span>
                    </td>
                    <td class="px-6 py-4" v-else>
                        <!-- View Teacher Info Here -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <MessagePopup
        v-if="showUpdatePopup"
        :title="title"
        :description="description"
        exit-text="Close"
        @on-exit="showUpdatePopup = false"
    />

    <MessagePopup
        v-if="showErrorPopup"
        title="Update Failed"
        description="Something went wrong with executing the update"
        exit-text="Close"
        @on-exit="showErrorPopup = false"
    />
</template>

<script>
export default {
    data() {
        return {
            // Render
            render: false,
            // Data
            facultyArray: null,
            // Popups
            title: String,
            description: String,
            showErrorPopup: false,
            showUpdatePopup: false,
        };
    },
    methods: {
        // Get Faculty
        async getFaculty() {
            // Call get all teachers api endpoint
            await this.$axios
                .get(`/teachers/`)
                // If successful
                .then(({ data }) => {
                    // Store data
                    this.facultyArray = data;
                })
                // If unsuccessful
                .catch((error) => {
                    console.log(error);
                });
        },
        getTitle(accepted) {
            if (accepted) {
                return "Teacher successfully accepted";
            } else {
                return "Teacher successfully rejected";
            }
        },
        getDescription(accepted, teacher_id, name) {
            if (accepted) {
                return `Teacher ${name} with ID: ${teacher_id} has been successfully accepted`;
            } else {
                return `Teacher ${name} with ID: ${teacher_id} has been rejected`;
            }
        },
        accept(teacher_id, name, index) {
            this.title = this.getTitle(true);
            this.description = this.getDescription(true, teacher_id, name);
            this.updateTeacherStatus(teacher_id, "ACTIVE", index);
        },
        reject(teacher_id, name, index) {
            this.title = this.getTitle(false);
            this.description = this.getDescription(false, teacher_id, name);
            this.updateTeacherStatus(teacher_id, "REJECTED", index);
        },
        async updateTeacherStatus(teacher_id, status, index) {
            await this.$axios
                .patch(`/teachers/status/${teacher_id}`, {
                    status: status,
                })
                .then(({ data }) => {
                    this.showUpdatePopup = true;
                })
                .then(async () => {
                    await this.$axios
                        .get(`/teachers/${teacher_id}`)
                        .then(({ data }) => (this.facultyArray[index] = data));
                })
                .catch((error) => {
                    this.showErrorPopup = true;
                });
        },
    },
    async created() {
        await this.getFaculty()
            .then(() => {
                this.render = true;
            });
    },
};
</script>
