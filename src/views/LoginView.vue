<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
    <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              type="text"
              v-maska="'+234 ###########'"
              v-model="credentials.phone"
              name="phone"
              id="phone"
              placeholder="+234 ##########"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-3 px-4 text-white text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
    <form v-else action="#" @submit.prevent="handleVerification">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              type="text"
              v-maska="'+234 ###########'"
              v-model="credentials.phone"
              name="phone"
              id="phone"
              placeholder="+234 ##########"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-3 px-4 text-white text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            verify
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { vMaska } from "maska/vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = reactive({
  phone: null,
});

const waitingOnVerification = ref(false);

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push({
      name: "landing",
    });
  }
});

// Clean up the phone number input
// Remove all non-numeric characters
const formattedCred = computed(() => {
  return {
    phone: credentials.phone.replace(/\D/g, ""),
  };
});

const handleLogin = () => {
  // Make API request
  axios
    .post("http://localhost:8000/api/login", {
      phone: `+234${formattedCred.slice(-11)}`,
    })
    .then((response) => {
      console.log(response.data);
      waitingOnVerification.value = true;
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};

const handleVerification = () => {
  axios
    .post("http://localhost:8000/api/login/verify", {
      phone: `+234${formattedCred.slice(-11)}`,
    })
    .then((response) => {
      console.log(response.data); //auth token
      localStroage.setItem("token", response.data);
      router.push({
        name: "landing",
      });
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};
</script>
