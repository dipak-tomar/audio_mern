import { Model, model, ObjectId, Schema } from "mongoose";
import { hash, compare } from "bcrypt";
// interface (typescript)
interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 60 min * 60 sec = 3600s
    default: Date.now(),
  },
});

/**
 * This is the middleware, It will be called before saving any record
 */
emailVerificationTokenSchema.pre("save", async function (next) {
  // check if password is present and is modified.
  if (this.isModified("token")) {
    // call your hashPassword method here which will return the hashed password.
    this.token = await hash(this.token, 10);
  }

  // everything is done, so let's call the next callback.
  next();
});
emailVerificationTokenSchema.methods.compareToken = async function (
  token: string
) {
  const result = await compare(token, this.token);
  return result;
};

export default model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
) as Model<EmailVerificationTokenDocument, {}, Methods>;
