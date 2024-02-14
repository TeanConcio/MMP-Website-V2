<script setup>
import LoadingSpinner from "../../common/LoadingSpinner.vue";
import { formatDate, formatName, formatEnum } from "@/util/helpers";
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
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    v-for="TORRequest in TORRequestArray"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {{
                            formatName(TORRequest.student.last_name, TORRequest.student.first_name)
                        }}
                    </th>
                    <th
                        scope="row"
                        class="px-6 py-3 font-medium"
                        v-if="TORRequest.status === 'PENDING'"
                    >
                        {{ formatDate(TORRequest.request_date) }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium" v-else>
                        {{ formatDate(TORRequest.request_date) }}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium">
                        {{ formatEnum(TORRequest.status) }}
                    </th>
                    <td class="px-6 py-4" v-if="TORRequest.status === 'PENDING'">
                        <a
                            href="#"
                            class="font-medium text-highlight_hover dark:text-highlight_hover hover:underline"
                            >View Request</a
                        >
                    </td>
                    <td class="px-6 py-4" v-else>
                        <a
                            href="#"
                            class="font-medium text-highlight_hover dark:text-highlight_hover hover:underline"
                        ></a>
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
            TORRequestArray: null,
        };
    },
    methods: {
        // Get TORs
        async getTORs() {
            // Call login api endpoint
            await this.$axios
                .get(`/tor_requests/`)
                // If get all teachers is successful
                .then(({ data }) => {
                    // Store teacher data in faculty
                    this.TORRequestArray = data;
                })
                // If unsuccessful
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    async created() {
        await this.getTORs()
            .then(() => {
                this.render = true;
            });
    },
};
</script>
