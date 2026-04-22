const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['video', 'pdf', 'code']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    default: '#'
  },
  duration: {
    type: String,
    validate: {
      validator: function(v) {
        if (this.type === 'video') return v && v.length > 0;
        return true;
      },
      message: 'Duration is required for video materials'
    }
  },
  pages: {
    type: Number,
    validate: {
      validator: function(v) {
        if (this.type === 'pdf') return v && v >= 1 && v <= 1000;
        return true;
      },
      message: 'Pages must be between 1 and 1000 for PDF materials'
    }
  },
  exercises: {
    type: Number,
    validate: {
      validator: function(v) {
        if (this.type === 'code') return v && v >= 1 && v <= 100;
        return true;
      },
      message: 'Exercises must be between 1 and 100 for code materials'
    }
  },
 
module.exports = mongoose.model('Material', materialSchema);