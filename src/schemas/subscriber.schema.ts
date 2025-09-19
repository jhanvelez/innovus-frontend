import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const subscriberInitialValues = {
  identification: '',
  nameOwner: '',
  phone: '',
  email: '',
  category: '',
  stratumId: '',
};

export const subscriberValidationSchema = Yup.object({
  identification: Yup.number().required(FIELD_REQUIRED_MESSAGE),
  category: Yup.string().max(50).required(FIELD_REQUIRED_MESSAGE),
  nameOwner: Yup.string().max(100).required(FIELD_REQUIRED_MESSAGE),
  phone: Yup.string().nullable(),
  phoneNumber: Yup.string()
    .nullable()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Número de telefono invalido"),
  email: Yup.string().email("Formato del email invalido")
    .max(100),
  stratumId: Yup.string().nullable(),
});
