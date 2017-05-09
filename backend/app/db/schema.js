module.exports = {
  title: {
    type: 'string',
    required: true
  },
  eventImage: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  },
  dates: {
    type: 'array',
    minItems: 1,
    items: { type: 'string' }
  },
  location: {
    type: 'string',
    required: true
  }
};
