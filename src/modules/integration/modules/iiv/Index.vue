<template>
  <div class="row">
    <div class="col-12">
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.iiv_info.fullTitle') }}</div>
      </div>
      <div class="card">
        <div>
          <b-card no-body>
            <Info></Info>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Info from './methods/methods1/methods1'
export default {
  components: {
    Info
  },
};
</script>
