import { extendObservable } from 'mobx';
import axios from 'axios';
import { closestTo, format } from 'date-fns';
import parseDate from '../utils/parse-date';

const endpoint = `${process.env.REACT_APP_API}/events`;

function _updateList(list, event, push = true) {
  event.dates = event.dates.map(date => parseDate(date));
  event.nextDate = closestTo(new Date(), event.dates);

  const localEvent = list.find(localEvent => localEvent.id === event.id);

  if (localEvent) {
    Object.assign(localEvent, event);
    return;
  }

  list.push(event);
}

let singleton;
export default function EventStore(initialState = {
  events: {
    list: []
  },
  lastView: {
    item: null,
    loading: false
  },
  featured: {
    list: []
  },
  loading: true,
  sending: false
}) {
  if (singleton) {
    return singleton;
  }

  singleton = extendObservable({
    load() {
      this.loading = true;
      return Promise.all([
        this.findAll(),
        this.findFeatured()
      ])
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    findAll() {
      return axios(endpoint)
        .then(response => {
          response.data.events.forEach(event => {
            _updateList(this.events.list, event);
          });

          return this.events.list;
        });
    },

    findById(id) {
      this.lastView.loading = true;
      this.lastView.item = null;

      return axios(`${endpoint}/${id}`)
        .then(response => {
          const event = response.data.event;
          _updateList(this.events.list, event, false);
          this.lastView.item = event;
          this.lastView.loading = false;
          return event;
        })
        .catch(err => {
          this.lastView.loading = false;
          throw new Error('redirect');
        });
    },

    create(event) {
      this.sending = true;
      return this
        .uploadImage(event.image)
        .then(url => {
          event.eventImage = url;
          event.dates = event.dates.map(date => format(date, 'MM/DD/YYYY hh:mm'));
          return axios.post(endpoint, { event });
        })
        .then(response => {
          const event = response.data.event;
          _updateList(this.events.list, event);

          this.sending = false;
          return event;
        })
        .catch(() => {
          this.sending = false;
        });
    },

    findFeatured() {
      return axios(`${endpoint}/featured`)
        .then(response => {
          response.data.events.forEach(event => {
            _updateList(this.featured.list, event);
          });

          return this.featured.list;
        });
    },

    uploadImage(file) {
      const data = new FormData();
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      data.append('upload', file);
      return axios
        .post('http://uploads.im/api', data, config)
        .then(response => response.data.data.img_url);
    }

  }, initialState);

  return singleton;
}
