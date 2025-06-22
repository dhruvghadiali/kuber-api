const mongoose = require("mongoose");

const { Schema } = mongoose;

const expenseTypeSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    //   validate: {
    //     validator: isActiveSchoolExistsValidator,
    //     message: schoolDetailsInvalid,
    //   },
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Expense type name is required"],
      maxlength: [50, "Expense type name must be at most 50 characters"],
      minlength: [2, "Expense type name must be at least 2 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Expense type description must be at most 200 characters"],
      minlength: [10, "Expense type description must be at least 10 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);



expenseTypeSchema.set("toObject", { virtuals: true });
expenseTypeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("expense_type", expenseTypeSchema);
