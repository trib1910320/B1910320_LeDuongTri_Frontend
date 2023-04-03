<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="modal-header">
      <h3 class="modal-title" :id="modalLabels">
        <slot></slot>
      </h3>
      <button class="btn border-0 text-danger" type="reset" data-bs-dismiss="modal" aria-label="Close">
        <i class="fa-sharp fa-solid fa-circle-xmark" style="font-size: 1.5rem;"></i>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group" v-if="!this.login">
        <Field name="name" type="text" class="form-control" v-model="userLocal.name" placeholder="Name" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field name="username" type="text" class="form-control" v-model="userLocal.username" placeholder="Account" />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field name="password" type="password" class="form-control" v-model="userLocal.password" placeholder="Password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group" v-if="!this.login">
        <Field name="repassword" type="password" class="form-control" rules="confirmed:@password"
          placeholder="Re-Password" />
        <ErrorMessage name="repassword" class="error-feedback" />
      </div>
    </div>
    <div class="modal-footer justify-content-center">
      <div class="form-group">
        <button v-if="this.login" class="btn btn-success mx-1">
          <i class="fa-solid fa-floppy-disk mx-1"></i>
          Login
        </button>
        <button v-else class="btn btn-success mx-1">
          <i class="fa-solid fa-floppy-disk mx-1"></i>
          Register
        </button>
        <button type="reset" class="ml-2 btn btn-danger mx-1" data-bs-dismiss="modal">
          <i class="fa-solid fa-trash-can mx-1"></i>
          Cancel
        </button>
      </div>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form, Field, ErrorMessage,
  },
  emits: ["submit:user", "delete:user"],
  props: {
    user: { type: Object, required: true },
    modalLabels: { type: String, default: null },
    login: { type: Boolean, default: true }
  },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .min(2, "Must have at least 2 characters.")
        .max(20, "Last name has at most 20 characters."),
      username: yup
        .string()
        .required("Please enter your account.")
        .min(8, "Must have at least 8 characters.")
        .max(50, "Account has at most 50 characters."),
      password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Must have at least 8 characters.")
        .max(50, "Password has at most 50 characters."),
      repassword: yup
        .string()
        .min(8, "Must have at least 8 characters.")
        .max(50, "Re-Password has at most 50 characters.")
        .oneOf([yup.ref('password'), null], "Re-Password does not match"),
    });
    return {
      userFormSchema,
      userLocal: this.user,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    deleteUser() {
      this.$emit("delete:user", this.userLocal.id);
    },
  },
}
</script>

<style scoped>
@import "@/assets/form.css";

.form-group {
  margin-top: 12px;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.modal-header {
  color: blue;
  text-shadow: 2px 2px 5px #007BFF;
}
</style>