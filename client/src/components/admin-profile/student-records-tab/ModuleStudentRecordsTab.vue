<script setup>
// Components
import MessagePopup from "../../../components/common/MessagePopup.vue";
import PromptPopup from "../../../components/common/PromptPopup.vue";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
// Helpers
import { formatName, addUnique } from "../../../util/helpers";
// Props
defineProps({
    moduleName: String,
    schoolYear: Number,
});
// Emits
defineEmits(["on-back"]);
</script>

<template>
    <LoadingSpinner v-if="!render" />
    <div v-else
        class="w-3/4 p-4">
        <button
            @click="$emit('on-back')"
            type="button"
            class="px-8 py-3 text-base font-medium text-center text-white bg-highlight mb-7 rounded-lg hover:bg-highlight_hover focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
            Back
        </button>
        <div class="flex">
            <div>
                <h1 class="text-4xl font-bold mb-4">{{ moduleName }} {{ schoolYear }}</h1>
                <h2 class="text-2xl font-semibold mb-4">Students</h2>
            </div>
            <button
                v-if="!isEditing"
                @click="switchToEditMode()"
                type="button"
                class="ml-auto mb-1 w-21 h-12 px-10 py-3 text-base font-medium text-center text-white bg-highlight rounded-lg hover:bg-highlight_hover"
            >
                Edit
            </button>
            <div v-if="isEditing" class="ml-auto flex">
                <button
                    @click="currentPopup = 'cancel'"
                    type="button"
                    class="mb-1 w-21 h-12 px-10 py-3 text-base font-medium text-center text-white bg-highlight rounded-lg hover:bg-highlight_hover"
                >
                    Cancel
                </button>
                <button
                    @click="saveChanges()"
                    type="button"
                    class="ml-10 mb-1 w-21 h-12 px-10 py-3 text-base font-medium text-center text-white bg-highlight rounded-lg hover:bg-highlight_hover"
                >
                    Save Changes
                </button>
            </div>
        </div>
        <div class="grid">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table class="w-full text-gray-500 text-xl text-center">
                    <thead class="text-xs text-white uppercase bg-highlight">
                        <tr>
                            <th scope="col" class="px-6 py-3">Student ID</th>
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Grade</th>
                            <th scope="col" class="px-6 py-3">Absences</th>
                            <th scope="col" class="px-6 py-3 text-center">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-if="moduleEnrollmentArray === null || moduleEnrollmentArray.length === 0"
                            class="bg-white border-b hover:bg-gray-300"
                        >
                            <th
                                id="student-id"
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                No Enrolled Students
                            </th>
                            <th id="name" scope="row" class="px-6 py-3 font-medium">-</th>
                            <th
                                id="student-grade"
                                scope="row"
                                class="px-6 py-3 font-medium"
                                contenteditable="true"
                            >
                                -
                            </th>
                            <th id="absences" scope="row" class="px-6 py-3 font-medium">-</th>
                            <th id="remarks" scope="row" class="px-6 py-3 font-medium">-</th>
                        </tr>
                        <tr
                            v-for="(enrollment, index) in moduleEnrollmentArray"
                            class="bg-white border-b hover:bg-gray-300"
                        >
                            <th
                                id="student-id"
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {{ enrollment.student.student_id }}
                            </th>
                            <th id="name" scope="row" class="px-6 py-3 font-medium">
                                {{
                                    formatName(
                                        enrollment.student.last_name,
                                        enrollment.student.first_name
                                    )
                                }}
                            </th>
                            <th>
                                <input
                                    @change="editGrade(enrollment.grade, index)"
                                    v-model="moduleEnrollmentArray[index].grade"
                                    :disabled="!isEditing"
                                    id="student-grade"
                                    scope="row"
                                    class="bg-inherit font-medium text-gray-500 text-xl text-center"
                                />
                                <div class="input-errors" v-if="errors.grades[parseInt(index)]">
                                    <div class="block mb-2 text-sm font-medium text-highlight">
                                        {{ errors.grades[parseInt(index)] }}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <input
                                    @change="editAbsences(enrollment.no_of_absences, index)"
                                    v-model="moduleEnrollmentArray[index].no_of_absences"
                                    :disabled="!isEditing"
                                    id="absences"
                                    scope="row"
                                    class="bg-inherit font-medium text-gray-500 text-xl text-center"
                                />
                                <div class="input-errors" v-if="errors.absences[parseInt(index)]">
                                    <div class="block mb-2 text-sm font-medium text-highlight">
                                        {{ errors.absences[parseInt(index)] }}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <input
                                    @change="editRemarks(index)"
                                    v-model="moduleEnrollmentArray[index].remarks"
                                    :disabled="!isEditing"
                                    id="remarks"
                                    scope="row"
                                    class="bg-inherit font-medium text-gray-500 text-xl text-center"
                                    :placeholder="enrollment.remarks"
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <MessagePopup
        v-if="currentPopup === 'invalid-inputs'"
        title="Invalid Inputs."
        description="Please follow the form guides."
        exit-text="Close"
        @on-exit="currentPopup = null"
    />

    <PromptPopup
        v-if="currentPopup === 'confirmation'"
        title="Are You Sure You Want to Save Changes?"
        description="Please review your changes before saving."
        confirm-text="Yes, I'm sure"
        exit-text="No, cancel"
        @on-confirm="updateEnrollments()"
        @on-exit="currentPopup = null"
    />

    <PromptPopup
        v-if="currentPopup === 'cancel'"
        title="Are You Sure You Want to Discard Changes?"
        description="This action cannot be undone."
        confirm-text="Yes, I'm sure"
        exit-text="No, cancel"
        @on-confirm="cancelChanges()"
        @on-exit="currentPopup = null"
    />

    <MessagePopup
        v-if="currentPopup === 'success'"
        title="Updated Student Records!"
        description="Student records have been successfully updated."
        exit-text="Close"
        @on-exit="currentPopup = null"
    />

    <MessagePopup
        v-if="currentPopup === 'error'"
        title="Something went wrong."
        description="Please try again."
        exit-text="Close"
        @on-exit="currentPopup = null"
    />
</template>

<script>
export default {
    data() {
        return {
            // Render
            render: false,
            // Mode
            isEditing: false,
            // Data
            moduleEnrollmentArray: null,
            changedIndices: [],
            backupEnrollmentsArray: [],
            // Errors
            errors: {
                grades: {},
                absences: {},
            },
            // Popups
            currentPopup: null,
        };
    },
    methods: {
        // Get info of a module
        async getModuleEnrollments() {
            await this.$axios
                .get(`/module_enrollments/enrollments/${this.moduleName}/${this.schoolYear}`)
                // If successful
                .then(({ data }) => {
                    // Store data
                    this.moduleEnrollmentArray = data;
                })
                // If unsuccessful
                .catch((error) => {
                    console.log(error);
                });
        },
        switchToEditMode() {
            this.isEditing = true;
            this.backupEnrollmentsArray = JSON.parse(JSON.stringify(this.moduleEnrollmentArray));
        },
        editGrade(grade, index) {
            const formattedGrade = parseFloat(grade).toFixed(2).toString();
            if (this.validateGrade(formattedGrade, index)) {
                this.moduleEnrollmentArray[index].grade = formattedGrade;
                addUnique(this.changedIndices, index);
            }
        },
        editAbsences(absences, index) {
            const formattedAbsences = parseFloat(absences).toFixed(0);
            if (this.validateAbsences(formattedAbsences, index)) {
                this.moduleEnrollmentArray[index].no_of_absences = formattedAbsences;
                addUnique(this.changedIndices, index);
            }
        },
        editRemarks(index) {
            addUnique(this.changedIndices, index);
        },
        cancelChanges() {
            this.isEditing = false;
            this.moduleEnrollmentArray = JSON.parse(JSON.stringify(this.backupEnrollmentsArray));
            this.changedIndices = [];
            this.errors = {
                grades: {},
                absences: {},
            };
            this.currentPopup = null;
        },
        saveChanges() {
            if (this.validate()) {
                this.currentPopup = "confirmation";
            } else {
                this.currentPopup = "invalid-inputs";
            }
        },
        async updateEnrollments() {
            for (let index = 0; index < this.changedIndices.length; index++) {
                const value = this.changedIndices[index];
                await this.$axios
                    .patch(
                        `module_enrollments/grade/${this.moduleEnrollmentArray[value].student.student_id}/${this.moduleName}/${this.schoolYear}`,
                        {
                            grade: this.moduleEnrollmentArray[value].grade,
                            no_of_absences: this.moduleEnrollmentArray[value].no_of_absences,
                            remarks: this.moduleEnrollmentArray[value].remarks,
                        }
                    )
                    // If successful
                    .then(() => {
                        // Remove index from changedIndices
                        this.changedIndices.splice(index, 1);
                        // If last index
                        if (index === this.changedIndices.length - 1) {
                            // Get updated enrollments
                            this.getModuleEnrollments(this.moduleName, this.schoolYear);
                        }
                    })
                    .then(() => {
                        this.currentPopup = "success";
                        this.isEditing = false;
                    })
                    // If unsuccessful
                    .catch((error) => {
                        this.currentPopup = "error";
                        return;
                    });
            }
        },
        // Validators
        validate() {
            // Validate form for all enrollments added
            this.changedIndices.forEach((index) => {
                this.validateGrade(this.moduleEnrollmentArray[index].grade, index);
                this.validateAbsences(this.moduleEnrollmentArray[index].no_of_absences, index);
            });

            // Check if there are errors
            if (
                Object.keys(this.errors).every((key) => Object.keys(this.errors[key]).length === 0)
            ) {
                return true;
            } else {
                return false;
            }
        },
        validateGrade(grade, index) {
            const validGrades = [
                "1.00",
                "1.25",
                "1.50",
                "1.75",
                "2.00",
                "2.25",
                "2.50",
                "2.75",
                "3.00",
                "5.00",
                "INC",
            ];

            if (!validGrades.includes(grade)) {
                this.errors["grades"][parseInt(index)] =
                    "Invalid Grade Format! Valid Formats: [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 5.00, INC]";
            } else {
                delete this.errors["grades"][parseInt(index)];
                return true;
            }
            return false;
        },
        validateAbsences(absences, index) {
            if (isNaN(absences)) {
                this.errors["absences"][parseInt(index)] = "Number of Absences must be a number!";
            } else if (absences < 0 || absences > 2) {
                this.errors["absences"][parseInt(index)] =
                    "Number of Absences must be between 0 and 2!";
            } else {
                delete this.errors["absences"][parseInt(index)];
                return true;
            }
            return false;
        },
    },
    async created() {
        await this.getModuleEnrollments()
            .then(() => {
                this.render = true;
            });
    },
};
</script>
