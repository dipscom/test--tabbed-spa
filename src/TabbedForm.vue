<template>
  <transition name="results" appear mode="out-in">
    <div key="form" v-if="!submitted" class="tabbed-form">
      <section class="tabbed-form__tabs">
        <button
          :class="{ active: collectedData.length === 0 }"
          @click.prevent="newTab"
          class="tabbed-form__bt new-tab--bt"
          >New Tab
        </button>

        <button
          v-for="(entry, index) in collectedData"
          :key="index"
          :data-index="index"
          :class="{ active: (index == currentIndex) }"
          :style="{ backgroundColor: servicesList[entry.service] ? servicesList[entry.service].color : '#fff' }"
          @click="selectTab"
          class="tabbed-form__bt"
          >
          <span>{{ entry.title || 'Please enter a title' }}</span><span>- &pound;{{ entry.quantity * entry.unitPrice }}</span>
        </button>
      </section>

      <section class="tabbed-form__inputs">
          <transition name="form" appear>
            <div v-if="collectedData.length < 1" class="tabbed-form--empty">
              No tabs created, click on 'New Tab' to begin.
            </div>

            <form-inputs
              v-else
              :key="currentIndex"
              :index="currentIndex"
              :info="displayedData"
              :services-list="servicesList"
              @update-service="updateService"
              @delete-tab="deleteTab"
              @duplicate-tab="duplicateTab"
              @form-completed="updateFormStatus"
              />
          </transition>
      </section>

      <footer class="tabbed-form__footer" v-show="collectedData.length > 0">
        <button class="submit--bt" @click.prevent="submitEntries" :disabled="!canSubmit">Submit</button>
      </footer>
    </div>

    <div key="results" v-else class="tabbed-form collected-data">
      <h4 class="collected-data__header">Entries submitted:</h4>
      <ul class="collected-data__entries">
        <li v-for="(entry, index) in collectedData" :key="'entry'+index">
          <h5 class="entry-heading">entry-{{ index + 1 }}: &#123;</h5>
          <ul class="collected-data__values">
            <li v-for="(value, key, index) in entry" :key="'value'+index">{{ key }}: {{ value }},</li>
          </ul>
          <h5 class="entry-heading">&#125;,</h5>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import FormInputs from './components/FormInputs';

  export default {
    name: 'tabbbed-form',
    components: {
      FormInputs,
    },

    data() {
      return {
        currentIndex: 0,
        collectedData: [],
        servicesList: [
          {
            title: 'Service 1',
            color: '#FFE3EC'
          },
          {
            title: 'Service 2',
            color: '#EFFCF6'
          },
          {
            title: 'Service 3',
            color: '#FFFBEA'
          },
        ],
        submitted: false
      }
    },

    computed: {
      displayedData() {
        return this.collectedData[this.currentIndex];
      },

      canSubmit() {
        return this.collectedData.every( entry => entry.formCompleted === true);
      }
    },

    methods: {
      newTab() {
        this.currentIndex = 0;
        this.collectedData.unshift({
          quantity: 1,
          unitPrice: 0.00,
          title: undefined,
          service: undefined,
          formCompleted: false,
        });
      },

      selectTab(event) {
        const trg = event.currentTarget;
        const index = Number(trg.dataset.index);

        this.currentIndex = index;
      },

      deleteTab(tabIndex) {
        this.collectedData.splice(tabIndex, 1);
        this.currentIndex--;
        if(this.currentIndex < 0) this.currentIndex = 0
      },

      duplicateTab(payload) {
        this.collectedData.splice(this.currentIndex, 0, payload);
      },

      updateService(payload) {
        const serviceIndex = Number(payload);
        this.collectedData[this.currentIndex].service = serviceIndex;
      },

      updateFormStatus(value) {
        this.collectedData[this.currentIndex].formCompleted = value;
      },

      submitEntries() {
        this.submitted = true;
      }
    },
  }
</script>

<style scoped>
  .tabbed-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  .tabbed-form__tabs {
    margin-right: calc(var(--baseline) * 4);
    margin-bottom: calc(var(--baseline) * 1.5);
    display: flex;
    flex-direction: column;
    overflow: auto;
    max-width: 100vw;
  }

  .tabbed-form__tabs > * {
    margin-bottom: 0;
    border-radius: 0;
  }

  .tabbed-form__tabs > :last-child {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  .new-tab--bt {
    background-color: #1890FF;
    color: #fff;
    padding: calc(var(--baseline) * 0.5) calc(var(--baseline) * 2);
    border-radius: 0;
    border: 0;
    white-space: nowrap;
  }

  .tabbed-form__bt.active {
    border-top-width: calc(var(--baseline) * 0.5);
    border-top-style: solid;
  }

  .new-tab--bt.active {
    border-top-color: #59AFFD;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  .tabbed-form__bt {
    max-width: 160px;
    text-align: left;
    display: flex;
  }

  .tabbed-form__bt > span {
    max-width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0;
  }

  .tabbed-form__inputs {
    flex-grow: 1;
    max-width: 375px;
    overflow: hidden;
    position: relative;
  }

  .tabbed-form__footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .tabbed-form--empty {
    flex-grow: 1;
    width: 100%;
    border: 1px dashed var(--border-color);
    padding: var(--baseline);
    min-height: 50vh;
    border-radius: var(--border-radius);
    color: var(--border-color);
  }

  .submit--bt {
    background-color: #3ECF8E;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
  }

  .submit--bt:disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  .collected-data {
    flex-direction: column;
    padding: var(--baseline);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background-color: rgba(255,255,255,0.6);
  }

  .collected-data .entry-heading,
  .collected-data ul,
  .collected-data li {
    margin-bottom: 0;
  }

  .collected-data__entries {
    padding-left: calc(var(--baseline) * 3);
    margin-bottom: 0;
  }

  .collected-data__values {
    padding-left: var(--baseline);
    margin-bottom: 0;
  }

  .form-enter-active, .form-leave-active {
    transition: transform .5s;
  }
  .form-enter {
    transform: translateX(100%);
    }
  .form-leave-to {
    transform: translateX(-100%);
    position: absolute;
    left: 0;
    top: 0;
  }

  .results-enter-active, .results-leave-active {
    transition: all .15s;
  }
  .results-enter, .results-leave-to {
    opacity: 0;
    }

  @media (max-width:799px) {

    .tabbed-form__tabs {
      flex-direction: row;
      margin-right: 0;
      overflow-x: auto;
    }

    .tabbed-form__tabs > * {
      flex-shrink: 0;
    }

    .tabbed-form__tabs > :last-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: var(--border-radius);
    }

    .new-tab--bt {
      padding: var(--baseline) calc(var(--baseline) * 2);
    }

    .new-tab--bt.active {
      border-bottom-left-radius: 0;
    }

    .tabbed-form__inputs,
    .tabbed-form__footer {
      margin-left: var(--baseline);
      margin-right: var(--baseline);
    }

    .collected-data {
      margin: calc(var(--baseline) * 2) var(--baseline);
    }
  }
</style>
