<template>
    <div v-if="isVisible" class="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);" @click.self="close">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Time</h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="hours" class="form-label">Hours:</label>
              <select id="hours" v-model="selectedHour" class="form-select">
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="minutes" class="form-label">Minutes:</label>
              <select id="minutes" v-model="selectedMinute" class="form-select">
                <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
            <button type="button" class="btn btn-primary" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean
    },
    data() {
      return {
        selectedHour: '00',
        selectedMinute: '00',
        hours: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
        minutes: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      save() {
        this.$emit('save', `${this.selectedHour}:${this.selectedMinute}`)
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-backdrop {
    display: none;
  }
  </style>