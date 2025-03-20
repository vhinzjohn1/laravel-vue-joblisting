<template>

  <Head title="Job Category"/>

  <component :is="layouts[userRole]">

    <template #header>
      <Header title="Job Category"/>
    </template>

    <div>
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">
                  Job Category
                </h3>
                <button
                  @click="addJobCategory"
                  class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                >
                  Add Job Category
                </button>
              </div>

              <div
                v-if="localJobCategories.length === 0"
                class="text-center py-8 text-gray-500"
              >
                No job categories found
              </div>

              <div v-else class="space-y-4">
                <DataTable 
                    :data="localJobCategories" 
                    :columns="['category_id', 'name', 'description']"
                    @edit="showEdit"
                    @delete="deleteJobCategory"
                    />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal For Adding Job Category -->
       <Modal :show="showAddModal" @close="closeModal('add')" maxWidth="xl" title="Add Job Category">
            <form @submit.prevent="saveJobCategory">
                <div class="p-5">
                    <div class="flex flex-col item-center justify-center">
                        <div class="form-group">
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <TextInput id="name" v-model="form.name" required autofocus/>
                        </div>
                        <div class="form-group">
                            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <TextInput id="description" v-model="form.description" required />
                        </div>

                        <div class="flex justify-end gap-5">
                            <button type="button" @click="closeModal('add')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">Cancel</button>
                            <button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200">Save</button>
                        </div>
                        
                    </div>
                </div>
               
            </form>
       </Modal>

      <!-- Modal For Editing Job Category -->
      <Modal :show="showEditModal" @close="closeModal('edit')" maxWidth="2xl" title="Edit Job Category">
        <form @submit.prevent="editJobCategory">
            <div class="p-5">
                <div class="flex flex-col item-center justify-center">
                    <div class="form-group">
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <TextInput id="name" v-model="form.name" required autofocus/>
                    </div>
                    <div class="form-group">
                        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <TextInput id="description" v-model="form.description" required />
                    </div>

                    <div class="flex justify-end gap-5">
                        <button type="button" @click="closeModal('edit')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200">Update</button>
                    </div>
                </div>
            </div>
        </form>
      </Modal>
    </div>

  </component>

</template>

<script setup>
import HRLayout from '@/Layouts/HR/HRLayout.vue';
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import { Head } from '@inertiajs/vue3';
import Header from '@/Components/Header/Header.vue';
import { usePage, useForm } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import DataTable from '@/Components/DataTable.vue';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';

const page = usePage()
const userRole = computed(() => page.props.auth.user.role_name)
const showEditModal = ref(false)
const showAddModal = ref(false)

const layouts = {
  admin: AdminLayout,
  hr: HRLayout
}

const form = useForm({
  name: '',
  description: '',
})

const localJobCategories = ref(page.props.jobCategories || '')

const addJobCategory = () => {
  showAddModal.value = true
}

const saveJobCategory = () => {
  axios.post(route('job-category.store'), form)
    .then((response) => {
      showAddModal.value = false
      form.reset()
      localJobCategories.value = response.data.data
      showToast('add', true)
    })
    .catch((error) => {
      showToast('add', false, error.response.data.message)
    })
}

const editJobCategory = () => {
  axios.put(route('job-category.update', form.category_id), form)
    .then((response) => {
      showEditModal.value = false
      form.reset()
      localJobCategories.value = response.data.data
      showToast('edit', true)
    })
    .catch((error) => {
      showToast('edit', false, error.response.data.message)
    })
}

const showEdit = (item) => {
  form.name = item.name
  form.description = item.description
  form.category_id = item.category_id
  showEditModal.value = true    
}


const closeModal = (action) => {
  if (action === 'add') {
    showAddModal.value = false
    form.reset()
  } else if (action === 'edit') {
    showEditModal.value = false
    form.reset()
  }
}



const deleteJobCategory = (jobCategory) => {
  // Show Toast confirmation
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
      axios.delete(`job-category/${jobCategory.category_id}`)
        .then((response) => {
          localJobCategories.value = response.data.data
          showToast('delete', true)
        })
        .catch((error) => {
          console.error(error.message)
          showToast('delete', false)
        })
    }
  })
}



const showToast = (action, isSuccess = true, message = '') => {
    let title, icon, background, toastOptions;

    switch (action) {
        case "add":
            title = isSuccess ? "Job Category Added Successfully!" : "Failed to Add Job Category.";
            break;
        case "edit":
            title = isSuccess ? "Job Category Updated Successfully!" : "Failed to Update Job Category.";
            break;
        case "delete":
            title = isSuccess ? "Job Category Deleted Successfully!" : "Failed to Delete Job Category.";
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
        iconColor: '#ffffff',
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: '#ffffff',
        background: background,
    };

    if (message) {
        toastOptions.text = message;
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire(toastOptions);
};
</script>