const mongoose = require("mongoose");

const { Schema } = mongoose;

const incomeTypeSchema = Schema(
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
      required: [true, "Income type name is required"],
      maxlength: [50, "Income type name must be at most 50 characters"],
      minlength: [2, "Income type name must be at least 2 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Income type description must be at most 200 characters"],
      minlength: [10, "Income type description must be at least 10 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);



incomeTypeSchema.set("toObject", { virtuals: true });
incomeTypeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("income_type", incomeTypeSchema);
