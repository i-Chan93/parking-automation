export const headers = [
  { text: '#', value: 'id', sortable: false, },
  {
    text: 'Car No.',
    align: 'center',
    sortable: false,
    value: 'carNum',
  },
  { text: 'Color', value: 'color', sortable: false, },
  { text: 'Slot No.', align: 'center', value: 'slotNum', sortable: false, },
  { text: 'Datetime', value: 'datetime', align: 'center', sortable: false, },
  { text: 'Actions', value: 'actions', align: 'center', sortable: false, }
];

export const parkingRows = [
  {
    id: 1,
    carNum: 'KA-05-MT-5572',
    color: 'Grey',
    slotNum: 1,
    datetime: new Date().toString().slice(0, 21),
  },
  {
    id: 2,
    carNum: 'KA-41-MP-0210',
    color: 'Red',
    slotNum: 4,
    datetime: new Date().toString().slice(0, 21),
  },
];