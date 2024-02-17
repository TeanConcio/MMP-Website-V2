<script setup>
// Store
import { useCredentialsStore } from "../../store/store";
// Components
import LogoLink from "../../components/common/LogoLink.vue";
import ContactForm from "../../components/contact/ContactForm.vue";
</script>

<template>
    <div class="app-container bg-background_pastel min-h-screen flex">
  <!-- Left Column -->
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto" style="flex: 2;">
    <img
      src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg"
      alt="Your Image"
      class="max-w-full h-auto"
    />
  </div>

  <!-- Right Column -->
  <div class="flex flex-col items-center justify-center px-6 py-20 mx-auto" style="flex: 1; margin-right: 10%;">
    <div class="mb-5">
      <LogoLink />
    </div>
    <ContactForm/>
  </div>
</div>

</template>

<script>
export default {
    beforeCreate() {
        // On component mount
        const store = useCredentialsStore();
        // If user is logged in
        if (store.isLoggedIn) {
            // Redirect to home page
            this.$router.push("/");
        }
    },
};
</script>
