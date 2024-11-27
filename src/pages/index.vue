<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="username"
          :rules="[required]"
          prepend-inner-icon="mdi-account-key"
          variant="outlined"
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[required]"
          label="Password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          @click:append-inner="toggleVisibility"
        ></v-text-field>

        <v-btn
          class="mb-8"
          :loading="loading"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Log In
        </v-btn>
      </v-form>
    </v-card>
  </div>

<!-- SnackBar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
      location="bottom right"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: true, // Form validation state
      username: null,
      password: null,
      loading: false,
      visible: false, // Password visibility toggle
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      snackbarColor: 'green',
    };
  },
  methods: {
    toggleVisibility() {
      this.visible = !this.visible; // Toggle password visibility
    },
    async onSubmit() {
      if (!this.form) return; // Ensure form is valid

      this.loading = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SUGAR_MONITORING_ENDPOINT}login`,
          {
            username: this.username,
            password: this.password,
          }
        );

        // Handle successful login
        this.snackbar = true;
        this.snackbarColor = 'green';
        this.text = response?.data?.data?.message;
          
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        localStorage.setItem("token", response?.data?.token);

        this.$router.push('/dashboard');

      } catch (error) {
        console.log(error)
        this.snackbar = true;
        this.snackbarColor = 'red';
        this.text = error?.response?.data?.errors?.[0]?.title

      } finally {
        this.loading = false;
      }
    },
    required(value) {
      return !!value || "Field is required"; // Basic required rule
    },
  },
};
</script>
