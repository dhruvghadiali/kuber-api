const mongoose = require("mongoose");

const { Schema } = mongoose;

const incomeSchema = Schema(
  {
    income_type: {
      type: Schema.Types.ObjectId,
      ref: "income_type",
      required: [true, "Income type is required"],
      //   validate: {
      //     validator: isActiveSchoolExistsValidator,
      //     message: schoolDetailsInvalid,
      //   },
    },
    amount: {
      type: Number,
      required: [true, "Income amount is required"],
      min: [0, "Income amount must be a positive number"],
      max: [1000000, "Income amount must be at most 1,000,000"],
    },
    payment_mode: {
      type: String,
      enum: ["cash", "UPI", "credit_card", "debit_card", "bank_transfer", "other"],
      required: [true, "Payment mode is required"],
      default: "cash",
    },
    date: {
      type: Date,
      required: [true, "Income date is required"],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Income description must be at most 200 characters"],
      minlength: [10, "Income description must be at least 10 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

incomeSchema.set("toObject", { virtuals: true });
incomeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("income", incomeSchema);
