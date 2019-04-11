<template lang="html">
  <article class="form-inputs">
    <div class="inputs__title input-row">
      <label :for="computedId + 'title'">Title</label><input :id="computedId + 'title'" type="text" name="title" v-model="info.title" placeholder="Please enter a title">
    </div>

    <div class="inputs__services">
      <h5 class="inputs__services__heading">Services</h5>
      <service-list
        :computed-id="computedId"
        :selected-service="info.service"
        :services-list="servicesList"
        @selected="updateService" />
    </div>

    <div class="inputs__quantity input-row">
      <label :for="computedId + 'quantity'">Quantity</label><input :id="computedId + 'quantity'" class="input--number" type="number" min="1" name="quantity" v-model="info.quantity" />
    </div>

    <div class="inputs__unit-price input-row">
      <label :for="computedId + 'unit'">Unit Price</label><input :id="computedId + 'unit'" class="input--number" type="number" min="0" step="0.01" name="unit-price" v-model="info.unitPrice"/>
    </div>

    <div class="inputs__total input-row">
      <label>Total</label><input class="input--number" type="text" name="total" :value="displayedTotal" disabled />
    </div>

    <div class="tabbed-form__modifiers">
      <button @click.prevent="duplicateTab" type="button" class="duplicate--bt">Duplicate</button>
      <button @click.prevent="deleteTab" type="button" class="delete--bt">Delete</button>

    </div>
  </article>
</template>

<script>
  import ServiceList from './ServicesList';


  export default {
    name: 'form-inputs',

    components: {
      ServiceList,
    },

    props: {
      index: {
        type: Number
      },
      info: {
        type: Object
      },
      servicesList: {
        type: Array
      },
    },

    computed: {
      computedId() {
        return 'id' + Date.now();
      },

      computedPrice() {
        return Number(this.info.unitPrice);
      },

      computedTotal() {
        return Number(this.info.quantity) * this.computedPrice;
      },

      displayedTotal() {
        return '£' + this.computedTotal;
      },

      formCompleted() {
        const titleReady = this.info.title !== undefined && this.info.title !== null && this.info.title.length >= 3;
        const serviceReady = this.info.service !== undefined;
        const unitPriceReady = this.computedPrice > 0;

        return titleReady && serviceReady && unitPriceReady;
      },
    },

    watch: {
      formCompleted(value) {
        this.$emit('form-completed', value);
      }
    },

    methods: {
      updateService(payload) {
        this.$emit('update-service', payload);
      },

      deleteTab() {
        this.$emit('delete-tab', this.index);
      },

      duplicateTab() {
        const copiedInfo = Object.assign({}, this.info);
        this.$emit('duplicate-tab', copiedInfo);
      },
    },
  }
</script>

<style lang="css" scoped>
  .form-inputs {
    width: 100%;
    flex-shrink: 0;
  }

  .input-row {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    overflow: hidden;
  }

  .input-row > * {
    background-color: #fff;
    margin-bottom: 0;
    padding: calc(var(--baseline) - 1px) var(--baseline);
  }

  .input-row label {
    border-right: 2px solid var(--border-color);
    width: 30%;
  }

  .input-row input {
    flex-grow: 1;
  }

  .input-row input.input--number {
    text-align: right;
  }

  .input-row input.input--number:disabled {
    background-color: #F5F9FC;
    font-weight: 800;
  }

  .inputs__title,
  .inputs__services {
    margin-bottom: calc(var(--baseline) * 1.5);
  }

  .inputs__services {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .inputs__services > :last-child {
    margin-bottom: 0;
  }

  .inputs__services__heading {
    margin-bottom: 0;
    font-weight: normal;
    /* the bellow padding is adjusted to take the border in consideration to keep the vertical rhythm */
    padding: calc(var(--baseline) - 1px) var(--baseline) calc(var(--baseline) - 2px);
    border-bottom: 2px solid var(--border-color);
    background-color: #fff;
  }

  .inputs__quantity {
    margin-bottom: calc(var(--baseline) * 0.5);
  }

  .inputs__unit-price,
  .inputs__total {
    margin-bottom: calc(var(--baseline) * 2);
  }

  .tabbed-form__modifiers {
    display: flex;
    justify-content: space-between;
    margin-bottom: calc(var(--baseline) * 2);
  }

  .tabbed-form__modifiers > * {
    margin-bottom: 0;
  }

  .delete--bt {
    color: #E12D39;
  }
  @media (min-width:800px) {
    .input-row > * {
      padding: calc(var(--baseline) * 0.5 - 1px) var(--baseline);
    }

    .inputs__services__heading {
      padding: calc(var(--baseline) * 0.5 - 1px) var(--baseline);
    }
  }
</style>
