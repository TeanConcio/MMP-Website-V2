<script setup>
// Store
import { useCredentialsStore } from "../../../store/store";
// Components
import ModuleCard from "../../common/ModuleCard.vue";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
import Dropdown from "../../common/Dropdown.vue";
// Emits
defineEmits(["select-module"]);
</script>

<template>
    <LoadingSpinner v-if="!render" />
    <div v-else class="w-full">
        <h1 class="text-4xl font-bold mb-4">
            Student Records <span class="font-medium">(per Module)</span>
        </h1>
        <Dropdown
            :options-array="yearRange"
            :default-option="filterYear"
            @on-select="
                (filter) => {
                    filterYear = filter;
                }
            "
        />
        <br />

        <LoadingSpinner v-if="!renderCards" />
        <div
            class="grid grid-cols-1 mb-5 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 align-center"
            v-else
        >
            <div v-if="displayArray === null || displayArray.length === 0">
                <ModuleCard module-name="No modules being taught" module-description="-" />
            </div>
            <div v-for="module in displayArray">
                <button
                    class="w-full h-auto"
                    @click="
                        $emit('select-module', {
                            module_name: module.details.module_name,
                            school_year: module.school_year,
                        })
                    "
                >
                    <ModuleCard
                        :module-name="`${module.details.module_name} ${module.school_year}`"
                        :module-description="module.details.description"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Render
            render: false,
            renderCards: false,
            // Store
            store: useCredentialsStore(),
            // Data
            modulesArray: null,
            displayArray: null,
            selectedModuleName: null,
            selectedModuleYear: null,
            yearRange: [],
            filterYear: null,
        };
    },
    methods: {
        // Get all modules teacher teaches
        async getAllModules() {
            await this.$axios
                .get(`/modules/`)
                // If successful
                .then(({ data }) => {
                    // Store data
                    this.modulesArray = data;
                })
                // If unsuccessful
                .catch((error) => {
                    console.log(error);
                });
        },
        getYearRange() {
            // Get all years from modules
            this.yearRange = this.modulesArray.map((element) => {
                return element.school_year;
            });
            // Remove duplicates
            this.yearRange = [...new Set(this.yearRange)];
            // Sort years in descending order
            this.yearRange.sort((a, b) => {
                return b - a;
            });
            // Set default filter year to the latest year
            this.filterYear = this.yearRange[0];
        },
        // Get the modules to display
        getDisplayData() {
            this.displayArray = [];
            this.modulesArray.forEach((element) => {
                if (element.school_year === parseInt(this.filterYear)) { // If module is in the selected year, add to display array
                    this.displayArray.push(element);
                }
            });
        },
    },
    async created() {
        // Get all modules
        await this.getAllModules().then(() => {
            this.render = true;
            this.getYearRange();
            this.getDisplayData();
            this.renderCards = true;
        });
    },
    watch: {
        // If filter year changes, update display data
        filterYear() {
            this.renderCards = false;
            this.getDisplayData();
            this.renderCards = true;
        },
    },
};
</script>
