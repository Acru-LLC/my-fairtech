<template>
  <base-create-or-update-wrapper
      @save="givePermissionsToRole"
      has-save-suspend
      :custom-title="`${editingItem.name ? editingItem.name : ''} (${$t('submodules.roles.permissions')})`"
  >
    <b-container
        fluid
        class="perm-group-wrapper"
        v-for="(permType, index) in permsListByRoleId"
        :key="`permCardForRole ${permType}-${index}`"
    >
      <b-row>
        <b-col
            cols="12"
            class="form-check perm-group-title"
        >
          <mark class="perm-group-title-icon"><i class="fa fa-check "></i></mark>

          <span
              @click="addOrRemoveAll(permType.forType.type)"
              class="form-check-label perm-group-title-label"
          >
                        <mark>{{
                            getName({
                              nameRu: permType.forType.typeNameRu,
                              nameLt: permType.forType.typeNameLt,
                              nameUz: permType.forType.typeNameUz,
                            }) ? getName({
                              nameRu: permType.forType.typeNameRu,
                              nameLt: permType.forType.typeNameLt,
                              nameUz: permType.forType.typeNameUz,
                            }) : permType.forType.type
                          }}</mark>
                    </span>
        </b-col>

        <b-col
            cols="12"
            class="perm-group-single-perm mt-3"
        >
          <b-row>
            <b-col
                class="py-2"
                cols="3"
                v-for="(list, i) in permType.list"
                :key="`perm-checkbox-${i}`"
            >
              <div class="form-check">
                <input
                    v-model="editingItem.permissionIds"
                    class="form-check-input"
                    type="checkbox"
                    :id="'permId' + list.id"
                    :value="list.id"
                />
                <label
                    class="form-check-label font-weight-normal"
                    :for="'permId' + list.id"
                >
                  {{
                    getName({
                      nameRu: list.name_ru,
                      nameLt: list.name_lt,
                      nameUz: list.name_uz,
                    })
                  }}
                </label>
              </div>
            </b-col>
          </b-row>
          <!-- <div class="form-check">
          </div> -->
        </b-col>
      </b-row>
    </b-container>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'role'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "UpdateRolePermissions",
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      permsListByRoleId: {}
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateRole'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    addOrRemoveAll(permType) {
      let foundPermObject = this.permsListByRoleId.find(perm => permType == perm.forType.type)
      let permIdsOfPermType = []
      if (foundPermObject) {
        permIdsOfPermType = foundPermObject.list.map(el => {
          return el.id
        })
      }
      let allFounded = permIdsOfPermType.every(ai => this.editingItem.permissionIds.includes(ai));
      if (allFounded) {
        this.editingItem.permissionIds = this.editingItem.permissionIds.filter(function (el) {
          return !permIdsOfPermType.includes(el);
        });
      } else {
        permIdsOfPermType.forEach(idToAdd => {
          let index = this.editingItem.permissionIds.findIndex(x => x === idToAdd);
          if (index === -1) {
            this.editingItem.permissionIds.push(idToAdd)
          }
        })
      }
    },
    async givePermissionsToRole() {
      await helperService.updateRolePermissionsById(this.editingItem, true)
          .then(res => {
            this.$router.go(-1)
            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
          })
          .catch(e => {
            console.log(e)
          })
    },
    async changePermsOfRole(item) {
      this.loading = true;
      this.dialogForPerms = true;
      this.editingIndex = this.rolesList.indexOf(item);
      this.editingItem = Object.assign({}, item);
      this.currentRolePermIds = [...item.permissionIds];
      await this.getPermissionsListByRoleId(item.id);
      this.loading = false
    },
  },
  /*
  * CREATED */
  async created() {
    // GET CURRENT ROLE
    await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
        .then(res => {
          this.editingItem = res.data
        })
        .catch(e => {
          console.log(e)
        })

    // GET PERMISSIONS_LIST BY ROLE ID
    await helperService.permissionsListByRoleId(this.$route.params.id, true)
        .then(res => {
          this.permsListByRoleId = res.data
        })
        .catch(e => {
          console.log(e)
        })
  }
}
</script>
<style scoped lang="scss">
::v-deep.perm-group-wrapper {
  padding: 1rem;
  border: solid 1px #cccccc;
  border-radius: 1rem;
  margin-top: 3rem;

  .perm-group-title {
    padding: 0.5rem;
    margin-top: -2.5rem;
    width: 30%;
    margin-right: auto;
    margin-left: auto;
    font-size: 1rem;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    justify-content: center;
    border-radius: 1rem;

    .perm-group-title-icon {
      background-color: #f5f5f5;

      i {
        color: green;
      }
    }

    .perm-group-title-label {
      color: green;

      mark {
        background-color: #f5f5f5;
      }
    }
  }

  .perm-group-single-perm {
    font-size: 0.9rem;
  }
}
</style>