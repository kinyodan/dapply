<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="applications_list"
    >
      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div class="image">
            <img
              :src="props.row.avatar"
              :alt="props.row.name"
              class="is-rounded"
            />
          </div>
        </b-table-column>
        <b-table-column label="Name" field="name" sortable>
          <nuxt-link
            :to="{ path: 'applications/'+props.row.uuid , params: { id: props.row.uuid } }"
          >
            {{ props.row.uuid }}
          </nuxt-link>
        </b-table-column>
        <b-table-column label="Status" field="status" sortable>
          {{ props.row.status }}
        </b-table-column>
        <b-table-column label="Current Stage" field="progress_steps" sortable>
          {{ props.row.progress_steps }}
        </b-table-column>
        <b-table-column
          class="is-progress-col"
          label="Progress"
          field="progress"
          sortable
        >
          <progress
            class="progress is-small is-primary"
            :value="props.row.progress"
            max="100"
            >{{ props.row.progress }}</progress
          >
        </b-table-column>
        <b-table-column label="Created">
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.created_at"
            >{{ props.row.created_at }}</small
          >
        </b-table-column>
        <b-table-column label="Last updated">
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.updated_at"
          >{{ props.row.updated_at }}</small
          >
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="{ name: 'client-id', params: { id: props.row.id } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import ApplicationsService from '~/services/ApplicationsService';

export default {
  name: 'ApplicationsTable',
  components: { ModalBox },
  props: [
    'applications_list',
    'dataUrl',
    'checkable',
  ],
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      applications:this.applications_list
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    },
    // applicationsList(){
    //   return this.applications
    // }
  },
  created(){
  },
  mounted() {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger',
          })
        })
    }
  },
  methods: {
    async getApplicationsList(){
      let response = await ApplicationsService.lisApplications()
      if(response.data.data.status){
        this.applications=response.data.data
      }
    },
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
