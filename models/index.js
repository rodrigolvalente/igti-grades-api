import mongoose from 'mongoose';

const db = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error('Valor invalido. Deve ser maior que zero');
    },
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

db.gradesModel = mongoose.model('grades', db);

db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
