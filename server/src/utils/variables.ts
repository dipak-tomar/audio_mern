const { env } = process as { env: { [key: string]: string } };

const { MONGO_URI, MAILTRAP_USER, MAILTRAP_PASSWORD } = env;
export const URI = MONGO_URI as string;
export const MAIL_TRAP_USER = MAILTRAP_USER as string;
export const MAIL_TRAP_PASSWORD = MAILTRAP_PASSWORD as string;
