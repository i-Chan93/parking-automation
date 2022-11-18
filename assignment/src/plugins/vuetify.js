import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const options = {
  theme: {
    themes: {
      light: {
        primary: '#26A69A',
        secondary: '#e8fbee',
        tertiary: '#F0F4C3',
        delete: '#B71C1C',
      },
    },
  },
};
export default new Vuetify(options);
