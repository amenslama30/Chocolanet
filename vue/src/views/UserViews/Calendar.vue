<template>
  <Sidebar>
    <div class="container">
      <FullCalendar id="calendar" :options="calendarOptions" />

      <div v-if="isModalVisible" class="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);" @click.self="closeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Créer votre publication</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <form @submit.prevent="createPostTimer">
              <div class="modal-body">
                <div class="form-group">
                  <label for="postMessage">Message</label>
                  <textarea class="form-control" v-model="postMessage" rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label for="postImage">Image</label>
                  <input type="file" class="form-control-file" id="postImage" @change="handleFileChange">
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="hours" class="form-label">Hours:</label>
                    <select id="hours" v-model="selectedHour" class="form-select">
                      <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                    </select>
                  </div>
                  <div class="col mb-3">
                    <label for="minutes" class="form-label">Minutes:</label>
                    <select id="minutes" v-model="selectedMinute" class="form-select">
                      <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Publier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </Sidebar>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Sidebar from "@/components/Sidebar.vue"
import { createPostTimer } from "@/services/PostService.js"

export default {
  props: {
    isVisible: Boolean
  },
  components: {
    Sidebar,
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventRender: function(info) {
          info.el.style.backgroundColor = info.event.extendedProps.backgroundColor;
        }
      },
      isModalVisible: false,
      postMessage: '',
      postImage: null,
      selectedHour: '00',
      selectedMinute: '00',
      hours: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
      minutes: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
    }
  },
  methods: {
    handleDateClick(arg) {
      this.isModalVisible = true;
      // Set the selected date for reference if needed
      this.selectedDate = arg.dateStr;
    },
    closeModal() {
      this.isModalVisible = false;
      // Reset form fields
      this.postMessage = '';
      this.postImage = null;
      this.selectedHour = '00';
      this.selectedMinute = '00';
    },
    handleFileChange(event) {
      this.postImage = event.target.files[0];
    },
    async schedulePost() {
      const scheduledTime = this.getScheduledTime();
      try {
        const response = await schedulePost(this.postMessage, scheduledTime);
        console.log(response);
        alert('Post scheduled successfully!');
        this.isModalVisible = false; // Close the modal after scheduling
        // Optionally, perform any additional actions after successful post scheduling
      } catch (error) {
        console.error('Error scheduling post:', error);
        alert('Failed to schedule post. Please try again later.');
        // Optionally, handle error or display an error message
      }
    },
    getScheduledTime() {
      const date = new Date(`${this.selectedDate}T${this.selectedHour}:${this.selectedMinute}:00`);
      return Math.floor(date.getTime() / 1000);
    }
  }
}
</script>

<style>
#calendar {
  max-width: 1100px;
  margin: 10px auto;
}

.fc-toolbar {
  color: #000;
}

.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 2px 4px;
  color: #934e1a;
}

.fc .fc-daygrid-day-number {
  padding: 4px;
  position: relative;
  z-index: 4;
  color: #000000;
}
.fc-daygrid-day {
  background-color: #fcf4e9;
}

.fc .fc-daygrid-day.fc-day-today {
  background-color: rgba(255, 211, 145, 0.671);
}

.fc .fc-button-primary {
  background-color: #4e2900;
  border-color: #ffffff;
}

.fc .fc-button-primary:disabled {
  background-color: #995700;
  border-color: #995700;
  color: #ffffff
}
.fc .fc-button-primary:not(:disabled) {
  cursor: pointer;
  outline: none;
  box-shadow: none; 
}
.fc .fc-button-primary:not(:disabled):hover {
  cursor: pointer;
  background-color: #8b5100;
  border: none;
  outline: none;
  box-shadow: none; 
}
.fc .fc-button-primary:not(:disabled):focus {
  cursor: pointer;
  background-color: #8b5100;
  outline: none;
  box-shadow: none; 
  border: none;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  outline: none;
  box-shadow: none; 
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  margin-left: 5px;
  outline: none;
  box-shadow: none;  
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child):hover {
  background-color: #4e2a00d7;
  box-shadow: none; 
  border: none;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child):hover {
  background-color: #4e2a00d7;
  box-shadow: none;  
  border: none;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child):active {
  background-color: #8b5100;
  box-shadow: none;  
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child):active {
  background-color: #8b5100;  
  box-shadow: none;  
}
</style>