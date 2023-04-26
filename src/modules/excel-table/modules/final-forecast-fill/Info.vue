<template>
  <tbody class="vertical-align-middle">
  <tr class="bg-light-violet">
    <th>{{ infoTypeKey + 1 }}</th>
    <th :colspan="getTableMaxRows-1">{{ infoType.name }}</th>
  </tr>
  <tr v-for="(childItem, childKey) in list.filter(e => e.infoType === infoType.code)" :key="childKey"
      :class="childItem.isParent ? 'bg-light-orange' : ''">
    <td>{{ childItem.number }}</td>
    <td style="max-width: 22vw;" colspan="2">
      {{
        getName({
          nameUz: childItem.nameUz,
          nameRu: childItem.nameRu,
          nameLt: childItem.nameLt,
        }) || ''
      }}
      {{
        childItem.employeeFullNames.length ?
            ("(" + (childItem.employeeFullNames.join(', ') || '').toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()) + ")") : ''
      }}
    </td>
    <td>
      {{
        childItem.measurementUnitId ? getName({
          nameUz: childItem.measurementUnitNameUz,
          nameRu: childItem.measurementUnitNameRu,
          nameLt: childItem.measurementUnitNameLt,
        }) : ''
      }}
    </td>
    <th v-for="(quarterItem, quarterKey) in quarterPlanDoneList" :key="quarterKey">
      <div v-if="childItem.isParent">
        <div v-if="quarterItem.type === 'plan'" class="text-center">
          {{
            childItem.quarterValueDtoList[quarterItem.quarterIndex] ? childItem.quarterValueDtoList[quarterItem.quarterIndex].plan : '-'
          }}
        </div>
        <div v-else>
          <div class="input-group">
            <input type="number"
                   step="any"
                   :disabled="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed"
                   class="form-control"
                   v-model="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex].done"
            />
            <div class="input-group-prepend"
                 v-if="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed !== true"
            >
              <span class="input-group-text btn btn-info" @click="openParentModal(true,'bases', infoTypeKey, childItem.parentIndex, childItem.childIndex, quarterItem.quarterIndex)">
                <i class="bx mdi mdi-attachment"></i>
              </span>
            </div>
            <div class="input-group-prepend" v-if="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed !== true && childItem.attachedEmployeeDtos.filter((item) => item.employeeId === currentEmployeeId).length > 0">
              <span class="bg-primary input-group-text text-white cursor-pointer" @click="confirmValue(statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex])">
                <i class="bx mdi mdi-check"></i>
              </span>
            </div>
            <div class="input-group-prepend" v-if="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed">
              <span class="bg-success input-group-text text-white"
                    v-b-tooltip.hover.top :title="$t('column.confirmed')">
                <i class="bx mdi mdi-check"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div v-if="quarterItem.type === 'plan'" class="text-center">
          {{
            childItem.quarterValueDtoList[quarterItem.quarterIndex] ? childItem.quarterValueDtoList[quarterItem.quarterIndex].plan : '-'
          }}
        </div>
        <div v-else>
          <div class="input-group">
            <input type="number"
                   step="any"
                   :disabled="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed"
                   class="form-control"
                   v-model="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex].done"
            />
            <div class="input-group-prepend"
                 v-if="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed !== true"
            >
              <span class="input-group-text btn btn-info" @click="openParentModal(true,'bases', infoTypeKey, childItem.parentIndex, childItem.childIndex, quarterItem.quarterIndex)">
                <i class="bx mdi mdi-attachment"></i>
              </span>
            </div>
            <div class="input-group-prepend" v-if="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed !== true && childItem.attachedEmployeeDtos.filter((item) => item.employeeId === currentEmployeeId).length > 0">
              <span class="bg-primary input-group-text text-white cursor-pointer"  @click="confirmValue(statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex])">
                <i class="bx mdi mdi-check"></i>
              </span>
            </div>
            <div class="input-group-prepend" v-if="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterItem.quarterIndex].isConfirmed">
              <span class="bg-success input-group-text text-white"
                    v-b-tooltip.hover.top :title="$t('column.confirmed')">
                <i class="bx mdi mdi-check"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </th>
  </tr>
  </tbody>
</template>

<script>
import {TokenService} from '../../../../shared/services/storage.service';
export default {
  name: "Info",
  props: {
    infoTypeKey: {
      type: Number,
      default: () => (1)
    },
    quarterList: {
      type: Array,
      default: () => ([])
    },
    measurementUnitList: {
      type: Array,
      default: () => ([])
    },
    infoType: {
      type: Object,
      default: () => ({})
    },
    quarterPlanDoneList: {
      type: Array,
      default: () => ([])
    },
    statisticReportInfoDto: {
      type: Array,
      default: () => ([])
    },
    measurementUnitMap: {
      type: Object,
      default: () => ({})
    },
    getTableMaxRows: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      list: [],
      infoTypeIterator: {},
    };
  },
  created() {
    this.serializeItems()
  },
  computed: {
    currentEmployeeId() {
      return parseInt(TokenService.getUserInfo().employeeId)
    },
  },
  methods: {
    addItem(childItem, childKey) {
      let empty = JSON.parse(JSON.stringify(childItem))
      empty = this.clearItemValues(empty)
      if (childItem.isParent) {
        if (childItem.children.length > 0) {
          let children = this.clearItemValues(empty.children[0]);
          children.number = 1;
          empty.children = [children];
        }
        empty.number = this.statisticReportInfoDto.filter(item => item.infoType === this.infoType.code).length + 1;
        this.statisticReportInfoDto.push(empty)
      } else {
        this.statisticReportInfoDto[childItem.parentIndex].children.push(empty)
        this.serializeItems();
      }
    },
    confirmValue(item){
      this.$emit('confirm-quarter-value', item);
    },
    clearItemValues(item) {
      item.employeeFullNames = [];
      item.employeeIds = [];
      item.id = null;
      item.measurementUnitId = null;
      item.measurementUnitNameLt = null;
      item.measurementUnitNameRu = null;
      item.measurementUnitNameUz = null;
      item.nameLt = null;
      item.nameRu = null;
      item.nameUz = null;
      return item
    },
    serializeItems() {
      let list = [];
      this.statisticReportInfoDto.forEach((infoItem, parentIndex) => {
        infoItem.number = list.filter(item => item.infoType === infoItem.infoType && item.isParent === true).length + 1;
        infoItem.isParent = true;
        infoItem.parentIndex = parentIndex;
        infoItem.employeeFullNames = infoItem.employeeFullNames || []; //todo API ga qo'shilganda olib tashlasa boladi
        list.push(infoItem);
        if (infoItem.children.length > 0) {
          infoItem.children.forEach((childItem, childIndex) => {
            childItem.number = childIndex + 1;
            childItem.isParent = false
            childItem.parentIndex = parentIndex
            childItem.employeeFullNames = childItem.employeeFullNames || []; //todo API ga qo'shilganda olib tashlasa boladi
            childItem.childIndex = childIndex
            childItem.infoType = infoItem.infoType
            list.push(childItem);
          });
        }
      });
      this.list = list
    },
    openParentModal(isOpen, name, infoTypeKey, parentIndex, childIndex, quarterKey = undefined) {
      this.serializeItems()
      this.$emit('open-parent-modal', isOpen, name, infoTypeKey, parentIndex, childIndex, quarterKey);
    },
  },
  watch: {
    statisticReportInfoDto() {
      this.serializeItems()
    },
  },
}
</script>

<style scoped>
.bg-light-orange {
  background-color: #ffdebc !important;
}

.bg-light-violet {
  background-color: #c7d1ff !important;
}

.vertical-align-middle th, .vertical-align-middle td {
  vertical-align: middle;
}
</style>