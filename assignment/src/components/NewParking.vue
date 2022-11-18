<template>
  <v-card flat>
    <v-card-title>New Parking Slot</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field
              v-model="parking.carNum"
              label="Car Number"
              :rules="carNumRules"
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="parking.color"
              label="Car Color"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!allowSubmit"
        @click="$emit('input', parking)"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "NewParking",
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      parking: {
        carNum: null,
        color: null,
      },
      carNumRules: [
        (v) =>
          /^[A-Z]{2}[ -][0-9]{1,2}[ -](?:[A-Z])?(?:[A-Z]*)?[ -][0-9]{4}$/.test(
            v
          ) || "Enter a valid Car number",
      ],
    };
  },
  emits: ["input"],
  computed: {
    allowSubmit() {
      return !!this.parking.carNum && !!this.parking.color;
    },
  },
  methods: {
    saveParkingSlot(parkingSlotData) {
      this.$emit("input", parkingSlotData);
    },
  },
};
</script>
