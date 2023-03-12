const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  sold: {
    type: Boolean,
    default: false
  },
  buyerEmail: {
    type: String,
    default: null
  },

  productTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },

  tag: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateOfPurchase: {
    type: Date,
    required: true
  },
  conditionRating: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  photos: [
    {
      name: {
        type: String,
      },
      path: {
        type: String,
      }
    }
  ]
});

module.exports = mongoose.model('Product', ProductSchema);
