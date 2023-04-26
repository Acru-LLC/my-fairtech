<template>
  <b-row>
    <b-col cols="12">
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('modules.management.project_lessons.title') }}
        </div>
      </b-col>
      <b-card>
        <b-card-body>
          <b-row class="mb-2">
            <div class="d-inline-block">
              <div class="search-box me-4 mb-2 d-inline-block">
                <div class="position-relative">
                  <b-input
                      v-model="searchKeyword"
                      type="text"
                      class="form-control"
                      @input="fetchTableItems"
                      :placeholder="$t('column.search')"
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </div>
            <div class="d-inline-block float-right">
              <b-btn
                  v-if="$can('create', 'project lesson')"
                  type="button"
                  class="btn btn-success btn-rounded mb-2 me-2"
                  :to="{name: 'ProjectLessonsCreate'}"
              >
                <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
              </b-btn>
            </div>
          </b-row>
          <b-row>
            <div class="col-md-6">
              <table class="table table-striped table-bordered table-sm table-hover">
                <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t('column.name') }}</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, key) in tableItems"
                    :key="key"
                    :class="{'active-lesson': playVideo.key === key}"
                    class="cursor-pointer"
                    @click="handlePlayVideo(item, key)">
                  <td style="width: 50px">
                    {{ key + 1 }}
                  </td>
                  <td>
                    {{ item.fileName }}
                  </td>
                  <td class="text-center text-nowrap">
                    <a class="btn btn-link p-0 text-black-50 mx-1" :href="'/'+item.fileUrl" target="_blank" download v-b-popover.hover.bottom="{content: $t('actions.download')}">
                      <i class="mdi mdi-download font-size-18"></i>
                    </a>
                    <b-btn v-if="$can('update', 'project lesson')" variant="link" class="text-decoration-none p-0 mx-1" @click="editItem(item.id)" v-b-popover.hover.bottom="{content: $t('actions.edit')}">
                      <i class="mdi mdi-circle-edit-outline font-size-18"/>
                    </b-btn>
                    <b-btn v-if="$can('delete', 'project lesson')" variant="link" class="text-decoration-none text-danger p-0 mx-1" @click="deleteItem(item.id)" v-b-popover.hover.bottom="{content: $t('actions.delete')}">
                      <i class="mdi mdi-trash-can font-size-18" />
                    </b-btn>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <template v-if="playVideo.item">
                <div v-if="['mp3'].includes(playVideo.extension)" class="embed-responsive">
                  <audio
                      class="embed-responsive-item"
                      controls
                      :src="'/' + playVideo.item.fileUrl"
                      :class="playVideo.key !== null ? 'd-block' : 'd-none'"
                  />
                </div>
                <div v-if="['jpg', 'jpeg', 'png', 'gif', 'webm'].includes(playVideo.extension)"
                     class="embed-responsive">
                  <img
                      class="w-100"
                      loading="lazy"
                      :src="'/' + playVideo.item.fileUrl"
                      :class="playVideo.key !== null ? 'd-block' : 'd-none'"
                  />
                </div>
                <div v-if="['mp4', 'avi', 'mkv'].includes(playVideo.extension)"
                     class="embed-responsive embed-responsive-16by9">
                  <video
                      ref="video"
                      class="embed-responsive-item"
                      controls
                      :src="'/' + playVideo.item.fileUrl"
                      :class="playVideo.key !== null ? 'd-block' : 'd-none'"
                  />
                </div>
                <div v-if="['pdf'].includes(playVideo.extension)" class="embed-responsive embed-responsive-16by9">
                  <iframe
                      class="embed-responsive-item"
                      frameborder="0"
                      :src="'/' + playVideo.item.fileUrl"
                      :class="playVideo.key !== null ? 'd-block' : 'd-none'"
                  />
                </div>
              </template>
            </div>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
const MAIN_API_URL = 'project-lesson'
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  components: {},
  data() {
    return {
      loadingTableItems: false,
      searchKeyword: '',
      selected: 'all',
      optionsTable: [
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
      tableItems: [],
      playVideo: {
        item: null,
        key: null,
        extension: "",
      }
    };
  },
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    handlePlayVideo(item, key) {
      console.log(item, key)
      if (this.playVideo.key === key) {
        this.playVideo.item = null;
        this.playVideo.key = null;
        this.playVideo.extension = "";
      } else {
        this.playVideo.item = item;
        this.playVideo.key = key;
        this.playVideo.extension = this.getExt(item?.fileModifiedName ?? '');
      }
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.sortDesc.push(false)
      crudAndListsService
          .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
          .then((res) => {
            this.tableItems = res.data.list;
            this.totalItems = res.data.total;
            if (res.data.list.length > 0 && res.data.list[0]) {
              setTimeout(() => this.handlePlayVideo(res.data.list[0], 0), 500);
            }
          })
          .catch(() => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    editItem(id) {
      if (this.$can('update', 'project lesson')) {
        this.$router.push({ name: 'ProjectLessonsUpdate', params: { id: id } })
      }
    },
    viewItem(id) {
      this.$router.push({ name: 'ProjectLessonsView', params: { id: id } })
    },
    deleteItem(id) {
      if (this.$can('delete', 'project lesson')) {
        this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
          okTitle: this.$t('actions.confirm'),
          cancelTitle: this.$t('actions.cancel')
        })
            .then(value => {
              if (value) {
                crudAndListsService
                    .deleteById(MAIN_API_URL, id)
                    .then(() => {
                      this.fetchTableItems()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              }
            })
            .catch(() => {
              // An error occurred
            })
      }
    },
  },
  created() {
    this.fetchTableItems()
  },
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      },
      deep: true
    }
  }
};
</script>

<style scoped lang='scss'>
tr.active-lesson , tr.active-lesson:hover {
  background-color: #cccccc!important;
}
.main-content table td {
  vertical-align: middle!important;
}
</style>