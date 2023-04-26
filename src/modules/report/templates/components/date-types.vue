<template>
  <div style="max-width: 500px">
    <label
        for=""
        class="m-0"
    >{{ $t( "dateTypes" ) }}</label>
    <MultiselectCustomized
        ref="dateTypeRef"
        :label="g_label('nameLt', 'nameRu', 'nameUz')"
        :options="dateTypeList"
        :trackId="'id'"
        @value="getValueDateType"
        @searchItem="searchItemDateType"
        :submitted="submitted"
    />
  </div>
</template>

<script>
import {g_label} from '@/helper'
import Service from "../../reportService";

export default {
  watch: {
    dateType: {
      deep: true,
      handler(v) {
        this.$emit( 'dateTypeVal', v )
      },
    },
  },
  props: {
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      g_label: g_label,
      searchValue: "",
      dateType: {},
      dateTypeList: []
    };
  },
  created() {
    this.getDateType();
  },
  methods: {
    getValueDateType(v) {
      this.dateType = v;
    },
    setEditedData(item) {
      let itemLabel = {
        id: item.dateTypeId,
        nameUz: item.dateTypeNameUz,
        nameLt: item.dateTypeNameLt,
        nameRu: item.dateTypeNameRu
      }
      this.$refs.dateTypeRef.setValue( itemLabel )
    },
    getDateType() {
      Service.getListDateTypes( {page: 0, limit: 20}, this.searchValue )
          .then( (rs) => {
            this.dateTypeList = rs.data.list;
          } )
          .catch( (e) => {});
    },
    searchItemDateType(q) {
      this.searchValue = q;
      this.getDateType();
    },
  },
};
</script>

<style>
</style>
