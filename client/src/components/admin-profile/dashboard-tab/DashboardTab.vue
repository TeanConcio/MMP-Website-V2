<script setup>
import FacultyTable from "./FacultyTable.vue";
import TranscriptTable from "./TranscriptTable.vue";
</script>

<template>
    <div class="w-3/4 p-4">
        <h1 class="text-4xl font-bold mb-4">Dashboard</h1>
        <h2 class="text-2xl font-semibold mb-4">Faculty</h2>
        <div class="grid">
            <FacultyTable />
        </div>
        <br /><br /><br /><br /><br /><br /><br />
        <h2 class="text-2xl font-semibold mb-4">Transcript</h2>
        <div class="grid">
            <TranscriptTable />
        </div>
    </div>
</template>
