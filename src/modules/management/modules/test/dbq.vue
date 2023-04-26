<template>
  <b-row>
    <b-col md="12">
      <h1>Test DBQ</h1>
      <b-card>
        <b-card-body>
          <b-btn @click="getData"> Click</b-btn>
          <hr>
          {{ state }}
          <hr>
          {{ response }}
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>

</template>

<script>
import apiService from '../../../../shared/services/api.service';

export default {
  name: "dbq",
  data() {
    return {
      state: '',
      statusCode: '',
      response: '',
    }
  },
  methods: {
    getData() {
      apiService.post('https://testapp.fairtech.uz/api/v.1/customs/send-info/to-DBQ').then(response => {
        this.state = 'success';
        this.response = response;
      }).catch(error => {
        this.state = 'error';
        this.response = error;
      });
    }
  }
}
</script>

<style scoped>

</style>