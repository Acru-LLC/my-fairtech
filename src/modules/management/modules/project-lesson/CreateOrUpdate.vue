<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('modules.management.project_lessons.title') }}
      </div>
    </b-col>
    <b-col md="12">
      <base-create-or-update-wrapper
          @save="save"
          has-save-suspend
          :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
      >
        <ValidationObserver ref="observer" v-slot="{}">
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <label for="">{{ $t('modules.management.project_lessons.name') }}</label>
              <b-form-input
                  v-model="editingItem.fileName"
                  :placeholder="$t('modules.management.project_lessons.name')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <label for="">{{ $t('modules.management.project_lessons.video') }}</label>
              <file-input
                  ref="video"
                  accept=".mp4, .mkv, .webm, .pdf, .jpg, .jpeg, .gif, .png, .mp3"
                  :file-size-limit="fileSizeLimit"
                  @is-large="fileIsLarge"/>
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
import apiService from "@/shared/services/api.service";
import crudAndListsService from "@/shared/services/crud_and_list.service"
import FileInput from '../../components/FileInput'

const MAIN_API_URL = 'project-lesson';
export default {
  name: "CreateOrUpdate",
  components: {
    FileInput
  },
  data() {
    return {
      editingItem: {},
      statuses: [],
      // 200 MB
      fileSizeLimit: 209715200,
    }
  },
  computed: {
    isModeCreate() {
      return this.$route.name === 'ProjectLessonsCreate'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    fileIsLarge(){
      this.$toast.warning(this.$t('modules.management.project_lessons.file_size_to_large'))
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.file_id) {
            const formData = new FormData();
            formData.append('file', this.$refs.video.file);
            apiService
                .formDataFile(MAIN_API_URL + `/update/${this.editingItem.file_id}/${this.editingItem.fileName}`, formData, true)
                .then(() => {
                  this.$refs.video.file = null;
                  this.computedObserver.reset()
                  this.editingItem = Object.assign({}, {});
                  this.$router.go(-1)
                  this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                })
                .catch((err) => {
                  this.$toast(err, { type: 'error' });
                });
          } else {
            const formData = new FormData();
            formData.append('file', this.$refs.video.file);
            apiService
                .post(MAIN_API_URL + `/create/${this.editingItem.fileName}`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then(() => {
                  this.$refs.video.file = null;
                  this.computedObserver.reset()
                  this.editingItem = Object.assign({}, {});
                  this.$router.go(-1)
                  this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                })
                .catch((err) => {
                  this.$toast(err, { type: 'error' });
                });
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        }
      });
    },
    async handleCreated() {
      this.var_default_search_payload.itemsPerPage = 500
      if (this.isModeCreate) {
        await crudAndListsService.getEmpty(MAIN_API_URL, null, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  async created() {
    await this.handleCreated();
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>