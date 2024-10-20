<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
        <form action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska="' +234 XXXXXXXXXX'" name="phone" id="phone" placeholder="+234 XXXXXXXXXX"
                            pattern="^\+234\d{10}$"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm" />
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" @submit.prevent="handleLogin"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-3 px-4 text-white text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Continue
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { vMaska } from "maska/vue"

const handleLOgin = () => {
    console.log()
}
</script>
