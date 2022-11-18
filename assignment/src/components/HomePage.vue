<template>
  <v-container fluid>
    <v-row align-content="center" class="pb-10 bg-blue" justify="center">
      <v-app-bar-title class="text-h4 heading-main"
        >Parking Automation System</v-app-bar-title
      >
    </v-row>
    <v-row no-gutters>
      <v-toolbar light flat dense class="my-5">
        <v-chip class="mx-2" color="primary"
          >Total Parking slots:
          <span class="pl-2"
            ><strong>{{ totalAvailableSlots }}</strong></span
          ></v-chip
        >
        <v-chip class="mx-2" color="tertiary"
          >Available parking slots :
          <span class="pl-2"
            ><strong>{{ availableSlots }}</strong></span
          ></v-chip
        >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="parkingData.length === 10"
          @click="openParkDialog()"
          >Park a car</v-btn
        >
      </v-toolbar>
    </v-row>
    <v-dialog v-model="parkingDialog" width="500">
      <new-parking
        v-model="parkingSlot"
        @input="(item) => saveNewParkingSlot(item)"
        @close="parkingDialog = false"
      >
      </new-parking>
    </v-dialog>
    <v-row>
      <v-col>
        <v-data-table
          :headers="parkingHeaders"
          :items="parkingData"
          class="elevation-1"
          id="p-table"
        >
          <template v-slot:[`item.id`]="{ item }">
            {{ parkingData.indexOf(item) + 1 }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="delete" dark @click="clearParkingSlot(item)">
              Remove
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import NewParking from "./NewParking.vue";
import { headers, parkingRows } from "./../data.js";
function setSlotNumCollection() {
  let slotNumCollection = [];
  for (let i = 0; i < 10; i++) {
    slotNumCollection.push({ slotNum: i + 1, availablity: true });
  }
  return slotNumCollection;
}
export default {
  name: "HomePage",
  components: { NewParking },
  props: {},
  data() {
    return {
      idLog: [],
      parkingData: parkingRows,
      parkingDialog: false,
      inited: false,
      slotNumCollection: setSlotNumCollection(),
      totalAvailableSlots: 10,
      availableSlots: 10,
      parkingSlot: null,
      parkingHeaders: headers,
    };
  },
  watch: {
    parkingData() {
      this.availableSlots = this.totalAvailableSlots - this.parkingData.length;
    },
  },
  beforeMount() {
    this.dataDump();
  },
  mounted() {
    if (!this.inited) {
      this.init();
    }
  },
  methods: {
    dataDump() {
      localStorage.setItem("tableItems", JSON.stringify(this.parkingData));
    },
    init() {
      this.parkingData = JSON.parse(localStorage.getItem("tableItems"));
      this.parkingData.forEach((element) => {
        let slIdx = this.slotNumCollection.findIndex(
          (el) => el.slotNum === element.slotNum
        );
        this.slotNumCollection[slIdx].availablity = false;
      });
    },
    openParkDialog() {
      this.parkingDialog = true;
    },
    clearParkingSlot(item) {
      this.parkingData.splice(this.parkingData.indexOf(item), 1);
      this.dataDump();
      this.init();
    },
    getParkingSlotNum() {
      return this.slotNumCollection.find((i) => i.availablity === true);
    },
    saveNewParkingSlot(item) {
      let pSlot = this.getParkingSlotNum().slotNum;
      item["slotNum"] = pSlot;
      item["datetime"] = new Date().toString().slice(0, 21);
      this.parkingData.push(item);
      this.parkingDialog = false;
      this.dataDump();
      this.init();
    },
  },
};
</script>
<style scoped>
.bg-blue {
  background: #26a69a;
}
.heading-main {
  color: #fff;
}
</style>
