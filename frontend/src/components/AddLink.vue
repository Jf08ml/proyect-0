<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h4>Registrar nuevo Link</h4>
      <q-form @submit.prevent="addLink" ref="formAdd">
        <q-input
          v-model="link"
          label="Ingrese link o URL"
          :rules="[
            (val) =>
              (val && /^https:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(val)) ||
              'Verificar formato link',
          ]"
          lazy-rules
        >
        </q-input>
        <div>
          <q-btn :loading = "loading" color="blue" label="Registrar Link" type="submit"> </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
  <script setup>
import { useUrlStore } from "../stores/url-store.js";
import { ref } from "vue";
import {useNotify} from '../composables/notifyHooks.js';


const loading = ref(false)
const useLink = useUrlStore();
const link = ref("");
const {showNotify} =  useNotify();
const formAdd = ref(null)

const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    formAdd.value.resetValidation();

    showNotify('Registrado correctamente', 'positive')
  } catch (error) {
    if(error.errors) {
        return error.errors.forEach((item)=> {
            showNotify(item.msg);
        })
    }

    showNotify(error);
  } finally {
    loading.value = false;
    link.value = "";
  }
};

</script> 