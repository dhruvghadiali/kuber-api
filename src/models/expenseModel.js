const mongoose = require("mongoose");

const { Schema } = mongoose;

const expenseSchema = Schema(
  {
    expense_type: {
      type: Schema.Types.ObjectId,
      ref: "expense_type",
      required: [true, "Expense type is required"],
      //   validate: {
      //     validator: isActiveSchoolExistsValidator,
      //     message: schoolDetailsInvalid,
      //   },
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      min: [0, "Expense amount must be a positive number"],
      max: [1000000, "Expense amount must be at most 1,000,000"],
    },
    payment_mode: {
      type: String,
      enum: ["cash", "UPI", "credit_card", "debit_card", "bank_transfer", "other"],
      required: [true, "Payment mode is required"],
      default: "cash",
    },
    date: {
      type: Date,
      required: [true, "Expense date is required"],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Expense description must be at most 200 characters"],
      minlength: [10, "Expense description must be at least 10 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

expenseSchema.set("toObject", { virtuals: true });
expenseSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("expense", expenseSchema);
