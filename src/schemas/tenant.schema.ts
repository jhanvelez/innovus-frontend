import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const tenantInitialValues = {
  fullName: '',
  identification: 0,
  serviceStartDate: '',
  phone: '',
  email: '',
  address: '',
};

export const tenantValidationSchema = Yup.object({
  fullName: Yup.string()
    .required(FIELD_REQUIRED_MESSAGE),
  identification: Yup.number()
    .required(FIELD_REQUIRED_MESSAGE),
  serviceStartDate: Yup.date()
    .required(FIELD_REQUIRED_MESSAGE),
  phone: Yup.string(),
  email: Yup.string().email("Formato del email invalido")
    .max(100),
  address: Yup.string(),
});
