const mongoose = require("mongoose");

const { Schema } = mongoose;

const investmentSchema = Schema(
  {
    investment_type: {
      type: Schema.Types.ObjectId,
      ref: "investment_type",
      required: [true, "Investment type is required"],
      //   validate: {
      //     validator: isActiveSchoolExistsValidator,
      //     message: schoolDetailsInvalid,
      //   },
    },
    amount: {
      type: Number,
      required: [true, "Investment amount is required"],
      min: [0, "Investment amount must be a positive number"],
      max: [1000000, "Investment amount must be at most 1,000,000"],
    },
    payment_mode: {
      type: String,
      enum: ["cash", "UPI", "credit_card", "debit_card", "bank_transfer", "other"],
      required: [true, "Payment mode is required"],
      default: "cash",
    },
    date: {
      type: Date,
      required: [true, "Investment date is required"],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Investment description must be at most 200 characters"],
      minlength: [10, "Investment description must be at least 10 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

investmentSchema.set("toObject", { virtuals: true });
investmentSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("investment", investmentSchema);
