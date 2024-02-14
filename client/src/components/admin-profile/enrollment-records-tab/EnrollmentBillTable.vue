<script setup>
// Helpers
import { formatName } from '../../../util/helpers';
import LoadingSpinner from "../../common/LoadingSpinner.vue";
// Props
defineProps({
    filter: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <LoadingSpinner v-if="!render" />
    <div v-else
        class="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto max-h-96">
        <table class="w-full text-gray-500 dark:text-gray-400 text-xl text-center">
            <thead class="text-xs text-white uppercase bg-highlight dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Student Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Tuition Fee
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Deductions
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Remaining Balance
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Grades
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="billArray?.length === 0"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        No Students Found
                    </th>
                </tr>
                <tr v-for="bill in billArray"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ bill.enrollments.student_id }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium">
                        {{ formatName(bill.enrollments.student.last_name, bill.enrollments.student.first_name) }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium" contenteditable="true">
                        {{ bill.tuition_fee }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium" contenteditable="true">
                        {{ bill.deductions }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium" contenteditable="true">
                        {{ bill.tuition_fee - bill.deductions }}
                    </th>
                    <td class="px-6 py-4" contenteditable="true">
                        {{ bill.enrollments.grade }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Render
            render: false,
            // Data
            billArray: null,
        };
    },
    methods: {
        async getModuleBills() {
            await this.$axios
                .get(`/bills/module/${this.filter}`)
                // If successful
                .then(({ data }) => {
                    // Store data
                    this.billArray = data;
                    console.log(this.billArray)
                })
                // If unsuccessful
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    watch: {
        async filter() {
            await this.getModuleBills()
                .then(() => {
                    this.render = true;
                });
        },
    },
    async created() {
        await this.getModuleBills()
            .then(() => {
                this.render = true;
            });
    },
};
</script>

