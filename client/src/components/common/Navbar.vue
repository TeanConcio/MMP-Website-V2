<template>
    <nav class="bg-white md:max-p-4 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link to="/" class="flex items-center">
                <img src="https://i.imgur.com/yCabNBZ.png" class="h-8 mr-3" alt="MMP Logo" />
                <span
                    class="hidden self-center text-2xl font-semibold whitespace-nowrap text-logo md:block"
                    >Mission Ministries Philippines</span
                >
                <span
                    class="block self-center text-2xl font-semibold whitespace-nowrap dark:text-logo md:hidden text-logo"
                    >MMP</span
                >
            </router-link>
            <div class="flex md:order-2">
                <router-link v-if="!store.isLoggedIn" to="/login">
                    <button
                        type="button"
                        class="text-white bg-highlight hover:bg-highlight_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </router-link>
                <button
                    v-else
                    @click="logout(store)"
                    type="button"
                    class="text-white bg-highlight hover:bg-highlight-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Logout
                </button>

                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                >
                    <span class="sr-only">Open main menu</span>
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>
            <div
                class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
            >
                <ul
                    class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                    <li>
                        <router-link
                            to="/"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            :class="{ 'md:text-highlight': $route.name === 'index' }"
                            aria-current="page"
                        >
                            Home
                        </router-link>
                    </li>
                    <li v-if="!store.isLoggedIn">
                        <router-link
                            to="/student/signup"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            :class="{ 'md:text-highlight': $route.name === 'student signup' }"
                        >
                            Enrollment
                        </router-link>
                    </li>
                    <li v-if="!store.isLoggedIn">
                        <router-link
                            to="/teacher/signup"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            :class="{ 'md:text-highlight': $route.name === 'teacher signup' }"
                        >
                            Faculty Sign-Up
                        </router-link>
                    </li>
                    <li v-if="store.isLoggedIn">
                        <button
                            @click="redirectProfile(store)"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            :class="{
                                'md:text-highlight': ['admin', 'teacher', 'student'].includes(
                                    $route.name
                                ),
                            }"
                        >
                            Profile
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useCredentialsStore } from "../../store/store";
const store = useCredentialsStore();
</script>

<script>
export default {
    methods: {
        // Methods of the component
        // Logout User
        logout(store) {
            store.logout();
            //Change the authorization headers of axious
            this.$axios.defaults.headers["Authorization"] = null;
            if (!store.isLoggedIn) {
                this.$router.push("/login");
            }
        },
        redirectProfile(store) {
            if (store.account_type == "student") {
                this.$router.push("/student");
            }
            if (store.account_type == "teacher") {
                this.$router.push("/teacher");
            }
            if (store.account_type == "admin") {
                this.$router.push("/admin");
            }
        },
    },
};
</script>
