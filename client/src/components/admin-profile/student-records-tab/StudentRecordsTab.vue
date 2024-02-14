<script setup>
// Store
import { useCredentialsStore } from "../../../store/store";
// Components
import ModuleCard from "../../common/ModuleCard.vue";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
// Emits
defineEmits(["select-module"]);
</script>

<template>
    <LoadingSpinner v-if="!render" />
    <div v-else
        class="w-3/4 p-4">
        <h1 class="text-4xl font-bold mb-4">Modules</h1>
        <!-- TODO: Add a prompt if there are no modules being taught -->
        <div class="grid grid-cols-5 gap-4">
            <div v-if="modulesArray === null || modulesArray.length === 0">
                <ModuleCard module-name="No modules being taught" module-description="-" />
            </div>
            <div v-for="module in modulesArray">
                <button
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
            // Store
            store: useCredentialsStore(),
            // Data
            modulesArray: null,
            selectedModuleName: null,
            selectedModuleYear: null,
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
    },
    async created() {
        await this.getAllModules()
            .then(() => {
                this.render = true;
            });
    },
};
</script>