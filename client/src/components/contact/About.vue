<script setup>
import { useCredentialsStore } from "../../store/store";
const store = useCredentialsStore();
</script>

<template>
    <section class="bg-center bg-no-repeat bg-blend-multiply bg-background">

        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:pt-48 mt-16">

            <div>
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white"
                    >
                    About Mission Ministries Philippines
                </h1>
                <p class="mb-8 mt-10 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">
                    Put about Mission Ministries Philippines here
                </p>
            </div>

            <div class="flex-1 max-w-full flex justify-center items-center">
                <img
                    src="https://missionministriesphilippines.org/wp-content/uploads/2021/03/aboutus-1.jpg"
                    alt="Your Image"
                    class="h-auto pt-12"
                />
            </div>
        </div>

        <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row max-h-fit max-w-full">
            <div class="flex-1">
                <div
                    class="w-full bg-white rounded-lg mx-auto p-4 shadow dark:border sm:max-w-2xl xl:p-0 md:max-p-4 lg:p-8 mb-8"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            Our Method of Ministry
                        </h1>
                        <p 
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            <span class="font-bold">OUR METHOD OF MINISTRY</span> - involves a transformational process at the grass roots level. We meet the educational needs of the poorest and youngest children, while developing transformational processes within each community we serve – enabling a people group to SHIFT with forward progress towards a better and more sustaining co-existence. We maintain the needs of children as a highest priority within all our initiatives.
                            <br><br>
                            Mission Ministries Philippines has 20+ years experience of growth and continued progress. We have built a solid foundation through educational and spiritual initiatives that continue to sustain many communities through growth and progressive educational transformation.
                            <br><br>
                            Mission Ministries Philippines has matured into a highly qualified Team with respected attributes of leadership and management. New strategies are continuously being implemented to strengthen a greater holistic early childhood and developmental approach within the urban slum culture. Where deemed necessary, we approach development within a target community with the same premise.
                            <br><br>
                            We are built on a foundation of following Jesus in His life and ministry among the poor. We will continue moving forward in the same regard!
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <div
                    class="w-full bg-white rounded-lg mx-auto p-4 shadow dark:border sm:max-w-2xl xl:p-0 md:max-p-4 lg:p-8 mb-8"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            Our Core Values
                        </h1>
                        <p 
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            <span class="font-bold">We Value the Children:</span> They are honored and precious in God's sight.
                            <br><br>
                            <span class="font-bold">We Value the Whole Church:</span> In response to Christ’s command to seek the unity of the body, we celebrate and commit to collaborate with God’s church.
                            <br><br>
                            <span class="font-bold">We Value the Vulnerable:</span> The Gospel is for all the people. That includes the rich, the successful and the powerful in our cities, although we specially notice in the Bible God’s awesome and unrelenting concern for the poor, widows, migrants, unemployed, sick persons, prisoners, aliens, victims and refugees.
                            <br><br>
                            <span class="font-bold">We Value Community:</span> We believe God’s Spirit calls and empowers us to community, and that this calling brings both relational and institutional tension.
                            <br><br>
                            <span class="font-bold">OUR FAITH IN JESUS</span> is central to who we are, and we follow His example in working alongside the poor and oppressed. We serve every child’s needs that we possibly can, of any faith, or none. We partner with churches throughout the Philippines, equipping them to meet the needs of their communities in light of the initiatives we establish.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<!-- Mobile responsiveness -->
<style scoped>
@media (max-width: 768px) {
    .flex-col {
        flex-direction: column;
    }
}
</style>
