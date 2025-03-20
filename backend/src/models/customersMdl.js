/**
 * Fields:
 * name
 * email
 * password
 * phone
 * memberships:
 *    membershipId
 *    startDate
 */
import { Schema, model } from "mongoose";

const customersSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "The name is required"]
      },
      email: {
         type: String,
         required: [true, "The email is required"],
         unique: true,
         validate: {
            validator: function (v) {
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
         }
      },
      password: {
         type: String,
         required: [true, "password is required"],
         minlength: [6, "password must be at least 6 characters long"]
      },
      phone: {
         type: String,
         required: [true, "The phone number is required"],
         unique: [true, "The phone number is already registered"],
         validate: {
            validator: function (v) {
               return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
         }
      },
      memberships: [
         {
            membershipId: {
               type: Schema.Types.ObjectId,
               ref: "memberships",
               required: [true, "The membership is required"]
            },
            startDate: {
               type: Date,
               required: [true, "The start date is required"],
               default: Date.now
            }
         }
      ]
   },
   {
      timestamps: true,
      strict: false,
   }
)

export default model('customers', customersSchema);