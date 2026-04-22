const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Semester 1', 'Semester 2']
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }]
});

const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  semesters: [semesterSchema]
});


  color: {
    type: String,
    default: '#0056D2'
  },
  lightColor: {
    type: String,
    default: '#E8F0FF'
  },
  icon: {
    type: String,
    default: 'Database'
  },
  description: {
    type: String,
    required: true
  },
  years: [yearSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Course', courseSchema);