<template>
  <HRLayout>
    <Head title="Admin Dashboard" />
    <template #header>
      <Header title="Admin Dashboard" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-4 flex justify-between items-center">
            <div class="relative">
              <input
                type="text"
                v-model="search"
                placeholder="Search users..."
                class="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              class="bg-green-700 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
              @click="showAddModal = true"
            >
              Add
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in data.data" :key="user.user_id">
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.user_id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.role_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      @click="showEdit(user)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteItem(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="previousPage"
                :disabled="data.current_page === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="data.current_page === data.last_page"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ data.from }}</span>
                  to
                  <span class="font-medium">{{ data.to }}</span>
                  of
                  <span class="font-medium">{{ data.total }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="previousPage"
                    :disabled="data.current_page === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    v-for="page in data.last_page"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      page === data.current_page
                        ? 'z-10 bg-green-50 border-green-500 text-green-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="data.current_page === data.last_page"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
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
import { ref, watch } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import debounce from 'lodash/debounce';

const data = ref(usePage().props.users);
const search = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const form = useForm({
  username: "",
  password: "",
  email: "",
  role_name: "",
  user_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

// Debounced search function
const debouncedSearch = debounce(() => {
  axios.get('/admin/0', {
    params: {
      page: currentPage.value,
      search: search.value
    }
  }).then(response => {
    data.value = response.data;
  }).catch(error => {
    console.error('Error searching users:', error);
  });
}, 500);

// Watch for search changes
watch(search, () => {
  currentPage.value = 1;
  debouncedSearch();
});

// Pagination methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    debouncedSearch();
  }
};

const nextPage = () => {
  if (currentPage.value < data.value.last_page) {
    currentPage.value++;
    debouncedSearch();
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  debouncedSearch();
};

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
    timer: 3000,
    toast: true,
    color: "#ffffff",
    background: background,
  };

  if (message) {
    toastOptions.text = message;
  }

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
    .post("admin", form, {
      params: {
        page: currentPage.value
      }
    })
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
    .put(`admin/${form.user_id}`, form, {
      params: {
        page: currentPage.value
      }
    })
    .then((response) => {
      data.value = response.data;
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
        .delete(`admin/${item.user_id}`, {
          params: {
            page: currentPage.value
          }
        })
        .then((response) => {
          data.value = response.data;
          showToast("delete");
        })
        .catch((error) => {
          showToast("delete", false, error.response.data.error);
        });
    }
  });
};
</script>
