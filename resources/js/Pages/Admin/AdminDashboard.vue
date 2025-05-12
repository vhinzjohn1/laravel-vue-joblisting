<template>
  <HRLayout>
    <Head title="Admin Dashboard" />
    <template #header>
      <Header title="Admin Dashboard" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <button
            class="bg-green-700 text-white font-semibold py-2 px-4 rounded float-right m-3 hover:bg-green-600"
            @click="showAddModal = true"
          >
            Add
          </button>
          <DataTable
            :data="data"
            :pageSize="10"
            :columns="[
              {
                key: 'user_id',
                title: 'User ID',
              },
              {
                key: 'username',
                title: 'Username',
              },
              {
                key: 'email',
                title: 'Email',
              },
              {
                key: 'role_name',
                title: 'Role',
              },
            ]"
            @edit="showEdit"
            @delete="deleteItem"
          />
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <Modal
      :show="showAddModal"
      @close="closeAddModal"
      maxWidth="2xl"
      :title="'Add User'"
    >
      <div class="p-6">
        <form @submit.prevent="saveChanges" class="space-y-4">
          <div class="form-group">
            <label
              for="exampleInputUsername"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <TextInput
              type="text"
              id="exampleInputUsername"
              v-model="form.username"
              required
              autocomplete="username"
              autofocus
            />
          </div>
          <div class="form-group">
            <label
              for="exampleInputEmail"
              class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <TextInput
              type="email"
              id="exampleInputEmail"
              v-model="form.email"
              required
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label
              for="exampleInputPassword"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <TextInput
              type="password"
              id="exampleInputPassword"
              v-model="form.password"
              required
              autocomplete="new-password"
            />
          </div>
          <div class="form-group">
            <label
              for="exampleInputRole"
              class="block text-sm font-medium text-gray-700"
              >Role</label
            >
            <select
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500"
              id="exampleInputRole"
              v-model="form.role_name"
              required
            >
              <option value="admin">Admin</option>
              <option value="hr">HR Personnel</option>
              <option value="applicant">Applicant</option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200 py-2 px-4 rounded"
              @click="closeAddModal"
            >
              Close
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 py-2 px-4 rounded"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>

    <!-- Edit User Modal -->
    <Modal
      :show="showEditModal"
      @close="closeEditModal"
      maxWidth="2xl"
      :title="'Edit User'"
    >
      <div class="p-6">
        <form @submit.prevent="editUser" class="space-y-4">
          <div class="form-group">
            <label
              for="editUserName"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <TextInput
              type="text"
              id="editUserName"
              v-model="form.username"
              required
              autocomplete="username"
              autofocus
            />
          </div>
          <div class="form-group">
            <label
              for="editEmail"
              class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <TextInput
              type="email"
              id="editEmail"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group">
            <label
              for="editPassword"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <TextInput
              type="password"
              id="editPassword"
              v-model="form.password"
            />
          </div>
          <div class="form-group">
            <label
              for="editRole"
              class="block text-sm font-medium text-gray-700"
              >Role</label
            >
            <select
              class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
              id="editRole"
              v-model="form.role_name"
              required
            >
              <option value="admin">Admin</option>
              <option value="hr">HR Personnel</option>
              <option value="applicant">Applicant</option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200 py-2 px-4 rounded"
              @click="closeEditModal"
            >
              Close
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 py-2 px-4 rounded"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </HRLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";

const data = ref(usePage().props.users);
const form = useForm({
  username: "",
  password: "",
  email: "",
  role_name: "",
  user_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

const closeAddModal = () => {
  showAddModal.value = false;
  form.reset();
};

const showToast = (action, isSuccess = true, message = "") => {
  let title, icon, background, toastOptions;

  switch (action) {
    case "add":
      title = isSuccess ? "User Added Successfully!" : "Failed to Add User.";
      break;
    case "edit":
      title = isSuccess
        ? "User Updated Successfully!"
        : "Failed to Update User.";
      break;
    case "delete":
      title = isSuccess
        ? "User Deleted Successfully!"
        : "Failed to Delete User.";
      break;
    default:
      title = isSuccess ? "Action Completed!" : "Action Failed!";
      break;
  }

  icon = isSuccess ? "success" : "error";
  background = isSuccess ? "#22c55e" : "#ef4444";

  toastOptions = {
    position: "top-end",
    icon: icon,
    title: title,
    iconColor: "#ffffff",
    showConfirmButton: false,
    timer: 3000, // Toast will disappear after 3 seconds
    toast: true, // Enable toast mode
    color: "#ffffff",
    background: background,
  };

  if (message) {
    toastOptions.text = message;
  }

  // Using SweetAlert2 toast with custom styling
  Swal.fire(toastOptions);
};

const showEdit = (item) => {
  form.username = item.username;
  form.email = item.email;
  form.password = item.password || "";
  form.role_name = item.role_name;
  form.user_id = item.user_id;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  form.reset();
};

const saveChanges = () => {
  axios
    .post("admin", form)
    .then((response) => {
      data.value = response.data;
      closeAddModal();
      showToast("add");
    })
    .catch((error) => {
      showToast("add", false, error.response.data.error);
    });
};

const editUser = () => {
  axios
    .put(`admin/${form.user_id}`, form)
    .then((response) => {
      data.value = response.data;
      console.log(response.data);
      closeEditModal();
      showToast("edit");
    })
    .catch((error) => {
      showToast("edit", false, error.response.data.error);
    });
};

const deleteItem = (item) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`admin/${item.user_id}`)
        .then(() => {
          data.value = data.value.filter(
            (user) => user.user_id !== item.user_id,
          );
          showToast("delete");
        })
        .catch((error) => {
          showToast("delete", false, error.response.data.error);
        });
    }
  });
};
</script>
