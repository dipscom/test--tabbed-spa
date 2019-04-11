<template lang="html">
  <ul class="inputs__services__list">
    <li v-for="(service, index) in servicesList" :key="index" class="service-item">
      <label :for="computedId + '-' + index" class="service-item__label">
        <input :id="computedId + '-' + index" type="radio" name="service" :value="index" @change="updateSelected" />
        <radio-input-icon :is-selected="selectedService === index" :color="service.color"/>
        {{ service.title }}
      </label>
    </li>
  </ul>
</template>

<script>
  import RadioInputIcon from './RadioInputIcon.vue';


  export default {
    components: {
      RadioInputIcon,
    },

    props: {
      computedId: {
        type: String
      },
      selectedService: {
        type: Number
      },
      servicesList: {
        type: Array,
        required: true
      }
    },

    methods: {
      updateSelected(event) {
        this.$emit('selected', event.target.value);
      }
    },

  }
</script>

<style lang="css" scoped>
  .service-item {
    margin-bottom: 0;
    background-color: #fff;
  }

  .service-item:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }


  .service-item * {
    margin-bottom: 0;
  }

  .service-item__label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .service-item__label input[type=radio] {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
