module.exports = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      maxLength: 140
    },
    image: {
      type: 'object',
      required: ['preview', 'size', 'type'],
      properties: {
        preview: { type: 'string', minLength: 1 },
        size: { type: 'number' },
        type: {
          type: 'string',
          pattern: '(image/jpeg|image/png)'
        }
      }
    },
    description: {
      type: 'string',
      minLength: 3
    },
    dates: {
      type: 'array',
      minItems: 1,
      items: {
        instanceof: 'Date'
      },
      uniqueItems: true
    },
    location: {
      type: 'string',
      minLength: 3
    }
  },
  required: ['title', 'image', 'description', 'dates', 'location'],
  errorMessage: {
    properties: {
      title: 'Title is required.',
      image: 'Image is required and must be JPEG/PNG',
      description: 'Description is required',
      dates: 'You need at least one date',
      location: 'Location is required.'
    }
  }
};
