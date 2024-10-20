<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
        <form action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska="'+234 ###########'" v-model="credentials.phone" name="phone" id="phone" placeholder="+234 ##########"

                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm" />
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-3 px-4 text-white text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Continue
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { vMaska } from "maska/vue"
import { reactive } from 'vue'
import  axios  from 'axios'


const credentials = reactive({
    phone: null
})

const handleLogin = () => {
    // Clean up the phone number input
    const cleanedPhone = credentials.phone.replace(/\D/g, '') // Remove all non-numeric characters

    // Make API request
    axios.post('http://localhost:8000/api/login', {
        phone: `+234${cleanedPhone.slice(-11)}`  // Assuming the number always starts with +234 and should have 10 digits
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
        alert(error.response.data.message)
    })
}
</script>
