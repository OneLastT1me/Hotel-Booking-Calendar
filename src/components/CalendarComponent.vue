
<template>
    <div class="container">
    <div class="table-container">
        <tr v-for="item in dataRoom" :key="item.index">
          <div class="item">{{ item.title }}</div>
        </tr>
      </div>
      <div class="calendar-container">
    <FullCalendar :options="{
      ...calendarOptions,
      events: events,
      eventClick: handleEventClick,
      eventContent: renderEventContent,
      eventDidMount: handleEventMount,
    }" />
        <EventPopover v-if="selectedEvent" :selectedEvent="selectedEvent" :onClose="handlePopoverClose"/>
  </div>
  
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid'
import EventPopover from './EventPopover.vue'

import { mapGetters } from 'vuex';

function transformBookingData(booking) {
  if (booking && booking.id) {
        return {
          id: booking.id || new Date(booking.start).toDateString() + new Date(booking.end).toDateString(),
          title: booking.name ,
          start: new Date(booking.start),
          end: new Date(booking.end),
          email: booking.email || '',
          roomDetails:  booking.roomDetails,
          phone: booking.phone ,
          guestInfo: booking.guestInfo,
          nameClient: booking.name 
        };
      }
}

export default {
  components: { FullCalendar, EventPopover },  
  computed: {
    
  ...mapGetters(["events"]),
},

methods: {
  transformAndSaveData(data) {
    const transformedData = data.map(transformBookingData);
    this.$store.commit('setEvents', transformedData);
  },
  handleEventClick(info) {
    this.selectedEvent = info.event.extendedProps;
     
    },
    handlePopoverClose() {
      this.selectedEvent = null;
    },
    renderEventContent(arg) {
      return {
        html: `<div class="event-content">${arg.event.title}</div>`,
      };
    },
    handleEventMount(info) {
      const eventEl = info.el;
      const eventContent = eventEl.querySelector('.event-content');
      const eventHeight = 35;

      eventContent.style.height = `${eventHeight}px`;
      
    },
},

created() {
  this.transformAndSaveData(this.events);
},
  data() {
    return {
      dataRoom: [
          { title: 'Primeir Suite' },
          { title: 'Superior Room' },
          { title: 'Grand Executive' },
          { title: 'Suite Lxury' },
          { title: 'Suite Classic rome' },
          { title: 'Penthouse Suite' }, 
      ],
      selectedEvent: null,
    calendarOptions: {
      plugins: [ dayGridPlugin ],
      
      initialView: 'dayGridWeek',

           
      timeZone: 'UTC',
      displayEventTime: false,
   
      
    },
  }
}
  }
  
      
</script>

<style scoped>
.fc-event-title {
  writing-mode: vertical-rl; /* Устанавливаем вертикальный текст */
  text-align: center; /* Выравниваем текст по центру */
}
.container {
  display: flex;
}

.table-container {
  width: 150px;
margin-top: 100px;

}

.calendar-container {
  flex: 1; 
}
.item {
margin-bottom: 20px;
}
</style>
