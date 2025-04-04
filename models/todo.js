// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// let Todo = new Schema({
//     title: {
//         type: String
//     },
//     description: {
//         type: String
//     },
//     is_complete: {
//         type: Boolean
//     },
//     due_date: {
//         type: Date
//     }
// });

// module.exports = mongoose.model('Todo', Todo);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the Todo model
const todoSchema = new Schema({
  title: {
    type: String,
    required: true, // Ensure title is mandatory
    trim: true, // Automatically remove leading/trailing spaces
  },
  description: {
    type: String,
    trim: true, // Automatically remove leading/trailing spaces
  },
  is_complete: {
    type: Boolean,
    default: false, // Default value for completion status
  },
  due_date: {
    type: Date,
    default: Date.now, // Default to the current date if not provided
  },
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

// Create and export the model
module.exports = mongoose.model('Todo', todoSchema);
