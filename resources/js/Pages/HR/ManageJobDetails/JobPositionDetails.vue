<template>
  <Head title="Job Position Details"/>
  <component :is="layouts[userRole]">

    <template #header>
      <Header title="Job Position Details"/>
    </template>

    <div>
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">
                  Job Position
                </h3>
                <button
                  @click="showAddModal = true"
                  class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                >
                  Add Job Position
                </button>
              </div>

              <div
                v-if="localJobPosition.length === 0"
                class="text-center py-8 text-gray-500"
              >
                No job positions found, please add one to proceed
              </div>

              <div v-else class="space-y-4">
                <DataTable 
                    :data="localJobPosition" 
                    :columns="[
                        { key: 'position_id', title: 'Position ID' },
                        { key: 'position_name', title: 'Position Name' },
                        { key: 'item_number', title: 'Item Number' },
                        { key: 'salary_grade.years_experience', title: 'Year Experience' },
                        { key: 'salary_grade.amount', title: 'Salary Grade', currency: '₱' }
                    ]"
                    @edit="showEdit"
                    @delete="deleteJobPosition"
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal For Adding Job Position -->
    <Modal :show="showAddModal" @close="closeModal('add')" maxWidth="xl" title="Add Job Position">
      <form @submit.prevent="saveJobPosition">
        <div class="p-5">
          <div class="flex flex-col item-center justify-center">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
              <TextInput id="name" v-model="form.position_name" required autofocus/>
            </div>
            <div class="form-group">
              <label for="item_number" class="block text-sm font-medium text-gray-700 mb-1">Item Number</label>
              <TextInput id="item_number" v-model="form.item_number" required/>
            </div>
            <div class="form-group">
              <label for="years_experience" class="block text-sm font-medium text-gray-700 mb-1">Year Experience</label>
              <TextInput id="years_experience" v-model="form.years_experience" required/>
            </div>
            <div class="form-group">
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Salary Grade</label>
              <TextInput id="amount" v-model="form.amount" required/>
            </div>

            <div class="flex justify-end gap-5">
              <button type="button" @click="closeModal('add')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200">Save</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>


    <!-- Modal for Editing Job Position Details -->
    <Modal :show="showEditModal" @close="closeModal('edit')" maxWidth="xl" title="Edit Job Position">
      <form @submit.prevent="editJobPosition">
        <div class="p-5">
          <div class="flex flex-col item-center justify-center">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
              <TextInput id="name" v-model="form.position_name" required autofocus/>
            </div>
            <div class="form-group">
              <label for="item_number" class="block text-sm font-medium text-gray-700 mb-1">Item Number</label>
              <TextInput id="item_number" v-model="form.item_number" required/>
            </div>
            <div class="form-group">
              <label for="years_experience" class="block text-sm font-medium text-gray-700 mb-1">Year Experience</label>
              <TextInput id="years_experience" v-model="form.years_experience" required/>
            </div>
            <div class="form-group">
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Salary Grade</label>
              <TextInput id="amount" v-model="form.amount" required/>
            </div>

            <div class="flex justify-end gap-5">
              <button type="button" @click="closeModal('edit')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200">Save</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>

  </component>

</template>

<script setup>
import HRLayout from '@/Layouts/HR/HRLayout.vue';
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import { Head } from '@inertiajs/vue3';
import Header from '@/Components/Header/Header.vue';
import { usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import DataTable from '@/Components/DataTable.vue';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from "@inertiajs/vue3";

const page = usePage()
const userRole = computed(() => page.props.auth.user.role_name)

const layouts = {
  admin: AdminLayout,
  hr: HRLayout
}

const form = useForm({
  position_name: '',
  item_number: '',
  years_experience: '',
  amount: '',
  position_id: '',
  salary_grade_id: '',
})

const showAddModal = ref(false)
const showEditModal = ref(false)

const localJobPosition = ref(page.props.positions || '') 
console.log(page.props.positions)


const saveJobPosition = () => {
  axios.post(route('job-position.store'), form)
    .then((response) => {
        showAddModal.value = false
        form.reset()
        localJobPosition.value = response.data.data
        showToast('add', true)
    })
    .catch(error => {
      console.error(error)
      showToast('add', false, error.response.data.message)
    })
}

const showEdit = (item) => {
  form.position_name = item.position_name
  form.item_number = item.item_number
  form.years_experience = item.salary_grade.years_experience
  form.amount = item.salary_grade.amount
  form.position_id = item.position_id
  form.salary_grade_id = item.salary_grade_id
  showEditModal.value = true
}

const editJobPosition = () => {
  axios.put(route('job-position.update', form.position_id), form)
    .then((response) => {
      showEditModal.value = false
      form.reset()
      localJobPosition.value = response.data.data
      showToast('edit', true)
    })
    .catch(error => {
      console.error(error)
      showToast('edit', false, error.response.data.message)
    })
}

const deleteJobPosition = (jobPosition) => {
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
      axios.delete(`job-position/${jobPosition.position_id}`)
        .then((response) => {
          localJobPosition.value = response.data.data
          showToast('delete', true)
        })
        .catch((error) => {
          console.error(error.message)
          showToast('delete', false)
        })
    }
  })
}

const closeModal = (action) => {
  if (action === 'add') {
    showAddModal.value = false
  } else if (action === 'edit') {
    showEditModal.value = false
    form.reset()
  }
}

const showToast = (action, isSuccess = true, message = '') => {
    let title, icon, background, toastOptions;

    switch (action) {
        case "add":
            title = isSuccess ? "Job Position Added Successfully!" : "Failed to Add Job Position.";
            break;
        case "edit":
            title = isSuccess ? "Job Position Updated Successfully!" : "Failed to Update Job Position.";
            break;
        case "delete":
            title = isSuccess ? "Job Position Deleted Successfully!" : "Failed to Delete Job Position.";
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