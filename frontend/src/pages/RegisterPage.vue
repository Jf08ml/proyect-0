<template>
    <q-page class="row justify-center">
      <div class="col-12 col-sm-6 col-md-5">
        <h3>Register</h3>
        <q-form @submit.prevent="handleSubmit">
          <q-input
            v-model="email"
            label="Ingrese email"
            :rules="[(val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Verificar formato email']"
          >
          </q-input>
  
          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Ingrese contraseña"
            :rules="[(val) => val.length > 6 || 'Contraseña requerido']"
          >
          <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
          </template>
          </q-input>

          <q-input
            v-model="repassword"
            :type="isPwd ? 'password' : 'text'"
            label="Confirme contraseña"
            :rules="[(val) => val === password || 'No coinciden las contraseñas']"
          >
          <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
          </template>
          </q-input>
  
          <div>
            <q-btn label="Register" type="submit"></q-btn>
          </div>
        </q-form>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import {useQuasar} from 'quasar'
  import {useRouter} from 'vue-router'
  import { ref } from "vue";
  import { useUserStore } from "src/stores/user-store.js";
  
  const userStore = useUserStore();
  const email = ref("");
  const password = ref("");
  const repassword = ref("");
  const isPwd = ref(true);
  const router = useRouter();
  
  const $q = useQuasar();
  
  const handleSubmit = async () => {
    try {
      await userStore.register(email.value, password.value, repassword.value)
      email.value = "";
      password.value = "";
      repassword.value ="";
      alertDialogRegister()
    } catch (error) {
      console.log(error.error)
      alertDialogBackend(error.error)
    }
  };
  
  const alertDialogBackend = ( message = "Error en el servidor") => {
      $q.dialog({
          title: 'Error',
          message,
      })
  }

  const alertDialogRegister = () => {
    $q.dialog({
          title: 'Confirm',
          message: "Registrado correctamente",
          pesistente: true
      }).onOk(()=> {
        router.push("/");
      })
  }
  </script>
  
  <style>
  </style>