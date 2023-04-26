<template>
  <tbody class="vertical-align-middle">
  <tr class="bg-light-violet">
    <th>{{ infoTypeKey + 1 }}</th>
    <th :colspan="getTableMaxRows-1">{{ infoType.name }}</th>
  </tr>
  <tr v-for="(childItem, childKey) in list" v-show="childItem.infoType === infoType.code" :key="childKey"
      :class="childItem.isParent ? 'bg-light-orange' : ''">
    <td>{{ childItem.number }}</td>
    <td style="max-width: 22vw;">
      <div class="form-control"
           style="height: auto;min-height: calc(1.5em + 0.5rem + 2px)" @click="openParentModal(true,'info_name', infoTypeKey, childItem.parentIndex, childItem.childIndex)">
        {{
          getName({
            nameUz: childItem.nameUz,
            nameRu: childItem.nameRu,
            nameLt: childItem.nameLt,
          }) || 'Matn kiriting ...'
        }}
      </div>
    </td>
    <td>
      <div class="form-control"
           style="height: auto;min-height: calc(1.5em + 0.5rem + 2px)" @click="openParentModal(true,'employee', infoTypeKey, childItem.parentIndex, childItem.childIndex)">
        {{
          childItem.employeeFullNames.join(', ') || '-'
        }}
      </div>
    </td>
    <td>
      <div class="form-control"
           style="height: auto;min-height: calc(1.5em + 0.5rem + 2px)" @click="openParentModal(true,'measurement_unit', infoTypeKey, childItem.parentIndex, childItem.childIndex)">
        {{
          childItem.measurementUnitId && measurementUnitMap && measurementUnitMap[childItem.measurementUnitId] ? getName({
            nameUz: measurementUnitMap[childItem.measurementUnitId].nameUz,
            nameRu: measurementUnitMap[childItem.measurementUnitId].nameRu,
            nameLt: measurementUnitMap[childItem.measurementUnitId].nameLt,
          }) : '-'
        }}
      </div>
    </td>
    <th v-for="(quarterItem, quarterKey) in quarterList" :key="quarterKey">
      <b-input-group v-if="childItem.isParent">
        <input v-model="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterKey].plan"
               class="form-control"
               step="any"
               type="number"
               :disabled="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterKey].isPlanConfirmed"
        />
        <div v-if="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterKey].isPlanConfirmed !== true"
             class="input-group-prepend">
              <span class="bg-primary input-group-text text-white cursor-pointer"
                    @click="confirmValue(statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterKey])">
                <i class="bx mdi mdi-check"></i>
              </span>
        </div>
        <div v-if="statisticReportInfoDto[childItem.parentIndex].quarterValueDtoList[quarterKey].isPlanConfirmed"
             class="input-group-prepend">
              <span v-b-tooltip.hover.top
                    :title="$t('column.confirmed')" class="bg-success input-group-text text-white">
                <i class="bx mdi mdi-check"></i>
              </span>
        </div>
      </b-input-group>
      <b-input-group v-else>
        <input v-model="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterKey].plan"
               class="form-control"
               step="any"
               type="number"
               :disabled="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterKey].isPlanConfirmed"
        />
        <div v-if="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterKey].isPlanConfirmed !== true"
             class="input-group-prepend">
              <span class="bg-primary input-group-text text-white cursor-pointer"
                    @click="confirmValue(statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterKey])">
                <i class="bx mdi mdi-check"></i>
              </span>
        </div>
        <div v-if="statisticReportInfoDto[childItem.parentIndex].children[childItem.childIndex].quarterValueDtoList[quarterKey].isPlanConfirmed"
             class="input-group-prepend">
              <span v-b-tooltip.hover.top
                    :title="$t('column.confirmed')" class="bg-success input-group-text text-white">
                <i class="bx mdi mdi-check"></i>
              </span>
        </div>
      </b-input-group>
    </th>
    <td class="text-center">
      <div class="btn-group">
        <i class="btn btn-sm btn-success bx mdi mdi-plus" @click="addItem(childItem, childKey)"></i>
        <i v-if="(childItem.isParent && childItem.parentIndex > 1) || (!childItem.isParent && childItem.childIndex >= 0)"
           class="btn btn-sm btn-danger bx mdi mdi-minus" @click="removeItem(childItem, childKey)"></i>
      </div>
    </td>
  </tr>
  </tbody>
</template>

<script>

const MAIN_API_URL = 'statistic-report'
import apiService from "../../../../shared/services/api.service";

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
    removeItem(childItem, childKey) {
      if (childItem.id) {
        apiService.post(MAIN_API_URL + '/delete-info-by-id/' + childItem.id).then(response => {

        })
      }
      if (childItem.isParent) {
        this.statisticReportInfoDto.splice(childItem.parentIndex, 1)
      } else {
        this.statisticReportInfoDto[childItem.parentIndex].children.splice(childItem.childIndex, 1)
        this.serializeItems();
      }
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
    editParentData(e, isParent, columnName, parentIndex, childIndex, quarterKey = undefined) {
      if (isParent) {
        this.statisticReportInfoDto[parentIndex].quarterValueDtoList[quarterKey][columnName] = e.target.value;
      } else {
        this.statisticReportInfoDto[parentIndex].children[childIndex].quarterValueDtoList[quarterKey][columnName] = e.target.value;
      }
    },
    confirmValue(item){
      this.$emit('confirm-quarter-value', item);
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