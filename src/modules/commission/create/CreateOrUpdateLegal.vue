<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateApplicationByLegal ref="formApplicationByLegal"></CreateApplicationByLegal>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateApplicationByLegal from "@/shared/views/components/commission/document/CreateApplicationByLegal";
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

const MAIN_API_URL = 'before-commission/application'

export default {
  name: "CreateOrUpdateLegal",
  /*
  * COMPONENTS */
  components: {
    CreateApplicationByLegal
  },
  /*
  * DATA */
  data() {
    return {}
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateApplicationByLegal'
    },
    computedObserver() {
      return this.$refs.formApplicationByLegal.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    hasProjectOwner() {
      if (this.$refs.formApplicationByLegal.editingItem.assignments) {
        let foundPOwner = false
        loop1:
            for (let i = 0; i < this.$refs.formApplicationByLegal.editingItem.assignments.length; i++) {
              for (let j = 0; j < this.$refs.formApplicationByLegal.editingItem.assignments[i].toEmployees.length; j++) {
                if (this.$refs.formApplicationByLegal.editingItem.assignments[i].toEmployees[j].isProjectOwner) {
                  foundPOwner = true
                  break loop1;  // breaks out of loop2 and loop1
                }
              }
            }
        return foundPOwner
      } else {
        return false
      }
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: node.name,
        }
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async returnBase64FilePromises() {
      if (this.$refs.formApplicationByLegal.editingItem.applicationFiles) {
        return await this.$refs.formApplicationByLegal.editingItem.applicationFiles.map(async f => {
          if (f.file.dataURL) {
            return {
              name: f.file.name,
              base64: f.file.dataURL
            }
          } else {
            return {
              name: f.file.name,
              base64: await this.getBase64(f.file),
            }
          }
        })
      }
      return []
    },
    async save() {
      this.computedObserver.validate().then(async valid => {
            if (valid && this.hasProjectOwner()) {
              this.$refs.formApplicationByLegal.editingItem.type = 'LEGAL'

              if (this.$refs.formApplicationByLegal.editingItem.id) {
                crudAndListsService.update(MAIN_API_URL, this.$refs.formApplicationByLegal.editingItem).then(res => {
                  this.computedObserver.reset()
                  this.$refs.formApplicationByLegal.editingItem = Object.assign({}, {});
                  this.$router.go(-1)
                  this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                })
              } else {
                let promises = await this.returnBase64FilePromises()
                Promise.all(promises).then(results => {
                  this.$refs.formApplicationByLegal.editingItem.applicationFiles = results

                  if (this.$refs.formApplicationByLegal.editingItem.assignments) {
                    let participants = this.$refs.formApplicationByLegal.editingItem.assignments
                    this.$refs.formApplicationByLegal.editingItem.assignmentParticipantList = participants.map(el => {
                      return {
                        "dateOfCreated": el.dateOfCreated,
                        "fromDepartmentId": el.fromEmployee.departmentId,
                        "fromEmployeeId": el.fromEmployee.employeeId,
                        "fromPositionId": el.fromEmployee.positionId,
                        "fromUserId": el.fromEmployee.id,
                        "resolution": "",
                        "sendingAssignmentParticipantList": el.toEmployees.map(toEl => {
                          return {
                            "mailingPurposeId": toEl.mailingPurposeId,
                            "processId": el.processId,
                            "toDepartmentId": toEl.toEmployee.departmentId,
                            "toEmployeeId": toEl.toEmployee.employeeId,
                            "toPositionId": toEl.toEmployee.positionId,
                            "toUserId": toEl.toEmployee.id,
                            "isProjectOwner": toEl.isProjectOwner
                          }
                        })
                      }
                    })
                    this.$refs.formApplicationByLegal.editingItem.assignments = null
                  }
                  this.$refs.formApplicationByLegal.editingItem.letterId = null
                  crudAndListsService.create(MAIN_API_URL, this.$refs.formApplicationByLegal.editingItem, null, true).then(res => {
                    this.computedObserver.reset()
                    this.$refs.formApplicationByLegal.editingItem = Object.assign({}, {});
                    this.$router.go(-1)
                    this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                  })
                })

              }
            } else {
              this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
            }
          }
      )
      ;
    }
  },
  /*
  * CREATED */
  async created() {
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>
