<template>
  <div class="card mb-0">
    <div class="card-body">
      <h4 class="card-title mb-4">{{ $t('members') }}</h4>
      <simplebar
          :key="cmpKey+'MEMBER'"
          data-simplebar-auto-hide="false"
          :style="`height: ${heightProp}px`"
          id="member-list"
          ref="membersRef"
      >
        <div class="table-responsive">
          <table class="table table-centered">
            <tbody>
            <tr v-for="(member, index) in members" :key="index">
              <td style="width: 50px;">
                <img
                    v-if="!member.employeePhotoUploadPath"
                    :src="`${hrUrl}/${member.employeePhotoUploadPath}`"
                    class="rounded-circle avatar-xs"
                    alt
                />
                <div v-else class="avatar-xs mr-3">
                  <span class="avatar-title rounded-circle bg-soft-primary text-white font-size-16">
                      {{ `${member.firstName.charAt(0)}${member.lastName.charAt(0)}` }}
                  </span>
                </div>
              </td>
              <td style="vertical-align: middle">
                <h5 class="font-size-14 m-0">
                  <p href="#" class="text-dark m-0 p-0">
                    {{ `${member.lastName} ${member.firstName} ${member.middleName}` }}
                  </p>
                </h5>
                <p class="m-0 text-muted">
                  {{ getName({ nameLt: member.departmentNameLt, nameUz: member.departmentNameUz, nameRu: member.departmentNameRu }) }}
                </p>
                <p class="m-0 text-muted">
                  {{ getName({ nameLt: member.staffPositionNameLt, nameUz: member.staffPositionNameUz, nameRu: member.staffPositionNameRu }) }}
                </p>
                <p class="m-0" v-if="member.mailingPurposeId">
                  {{ getName({ nameLt: member.mailingPurposeNameLt, nameUz: member.mailingPurposeNameUz, nameRu: member.mailingPurposeNameRu }) }}
                </p>
              </td>
              <td>
                <div v-if="isCommission">
                  <i v-if="member.isAdmin" class="mdi mdi-shield-account-outline text-success font-size-20 hi" />
                  <i
                      v-else-if="project.isAdmin && !['FINISHED', 'REVIEW_FINISHED', 'TEMPORARILY_CLOSED'].includes(project.status)"
                      class="bx bx-trash font-size-20 hi"
                      @click.prevent="deleteMember(member.employeeId)"
                  ></i>
                </div>
                <div v-else>
                  <i v-if="member.isAdmin" class="mdi mdi-shield-account-outline text-success font-size-20 hi" />
                  <i
                      v-else-if="project.isAdmin && !['FINISHED', 'REVIEW_FINISHED', 'COMMISSION_REVIEW_CLOSED', 'TEMPORARILY_CLOSED'].includes(project.status)"
                      class="bx bx-trash font-size-20 hi"
                      @click.prevent="deleteMember(member.employeeId)"
                  />
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </simplebar>
    </div>

    <div class="p-3" v-if="project && !['TEMPORARILY_CLOSED', 'REVIEW_FINISHED', 'COMMISSION_REVIEW_CLOSED', 'FINISHED'].includes(project.status)">
      <div>
        <b-button @click.prevent="clickAdd" variant="primary" block >
          <i class="fa fa-user-plus d-block font-size-16"></i>
          {{ $t('actions.add') }}
        </b-button>
      </div>
    </div>

    <b-sidebar
        backdrop-variant="dark"
        backdrop
        class="sidebar1"
        shadow
        sidebar-class="p-0"
        :no-header="true"
        right
        v-model="isModal"
    >
      <div>
        <members :notIn="true" for-project v-if="isModal" @save="save" @cancel="isModal=false" ref="empMembersRef" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
import Members from "@/components/members";

export default {
  props: ["heightProp", "close", "isMembers", "project"],
  data() {
    return {
      params: {
        page: 0,
        itemsPerPage: 20
      },
      members: [],
      memberPage: 0,
      isModal: false,
      cmpKey: 0,
    };
  },
  /*
    COMPUTED */
  computed: {
    projectType() {
      return this.$route.name === 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
    },
    isCommission() {
      return this.projectType === 'COMMISSION'
    }
  },
  components: {
    simplebar,
    Members
  },
  created() {
    if (
        this.$route.query.page === "overview" ||
        this.$route.query.page === "tasks"
    ) {
      this.listMembers();
    }
  },
  methods: {
    recalculate() {
      this.cmpKey += 1;
      setTimeout(() => {
        this.scrollActive();
      }, 200);
    },
    scrollActive() {
      // Contact list actions
      if (this.isMembers) {
        this.$refs.membersRef.SimpleBar.getScrollElement().addEventListener(
            "scroll",
            e => {
              let { scrollTop, scrollHeight, clientHeight } = event.target;
              const offsetForTrigger = 1;
              if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
                this.loadMoreMembers((this.memberPage += 1));
              }
            }
        );
      }
    },
    save(members) {
      let projectId = this.$route.query.id;
      if (members.length > 0) {
        projectService
            .addMember(projectId, members.map(emp => {
              return { employeeId: emp.employeeId, mailingPurposeId: emp.mailingPurposeId }
            }))
            .then(rs => {
              this.successSaved();
              this.isModal = false;
              this.listMembers();
              this.$emit("success");
            })
            .catch(err => {
              // this.catchErr(err);
            });
      }
    },
    deleteMember(id) {
      let projectId = this.$route.query.id;
      this.cnf().then(v => {
        if (v.value) {
          projectService
              .deleteMember(projectId, id)
              .then(rs => {
                this.deleteSuccess();
                this.listMembers();
              })
              .catch(err => {
                // this.catchErr(err);
              });
        }
      });
    },
    clickAdd() {
      this.isModal = true;
      setTimeout(() => {
        this.$refs.empMembersRef.reset();
      });
    },
    leaveMember(cmt) {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .leaveComment(id, null, cmt)
            .then(rs => {
              setTimeout(() => {
                this.listMembers();
              }, 300);
            })
            .catch(err => {
              // this.catchErr(err);
            });
      } else {
        this.$router.go(-1);
      }
    },
    listMembers() {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .listMembers(id, this.params, this.projectType)
            .then(rs => {
              this.members = rs.data.list;
            })
            .catch(err => {
              // this.catchErr(err);
            });
      } else {
        this.$router.go(-1);
      }
    },
    loadMoreMembers(page) {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .listMembers(id, {
              page: (this.memberPage += 1),
              itemsPerPage: 20
            }, this.projectType)
            .then(async ({ data }) => {
              if (data.list.length > 0) {
                this.members = this.members.concat(data.list);
              } else {
                this.memberPage -= 2;
              }
            });
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    var container3 = document.querySelector(
        "#member-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({ top: 500, behavior: "smooth" });
    }
    setTimeout(() => {
      this.scrollActive();
    }, 200);
  }
};
</script>

<style lang="scss">
.sidebar1 {
  .b-sidebar {
    width: 500px;
    background: white;
  }
}
</style>