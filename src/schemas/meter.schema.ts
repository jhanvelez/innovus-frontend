import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const meterInitialValues = {
  serialNumber: '',
  brand: '',
  model: '',
  diameter: '',
  type: '',
  installationDate: '',
  installer: '',
  provider: '',
  purchaseDate: '',
  value: '',
  propertyId: '',
};

export const meterValidationSchema = Yup.object({
  serialNumber: Yup.string()
    .required(FIELD_REQUIRED_MESSAGE),
  brand: Yup.string()
    .nullable()
    .default(''),
  model: Yup.string()
    .nullable()
    .default(''),
  diameter: Yup.number()
    .typeError('Debe ser un número')
    .required(FIELD_REQUIRED_MESSAGE),
  type: Yup.string()
    .nullable()
    .default(''),
  installationDate: Yup.date()
    .typeError('Debe ser una fecha válida (YYYY-MM-DD)')
    .required(FIELD_REQUIRED_MESSAGE),
  installer: Yup.string()
    .nullable()
    .default(''),
  provider: Yup.string()
    .nullable()
    .default(''),
  purchaseDate: Yup.date()
    .typeError('Debe ser una fecha válida (YYYY-MM-DD)')
    .required(FIELD_REQUIRED_MESSAGE),
  value: Yup.number()
    .typeError('Debe ser un número')
    .required(FIELD_REQUIRED_MESSAGE),
  propertyId: Yup.string()
    .uuid('Debe ser un UUID válido')
    .required(FIELD_REQUIRED_MESSAGE),
});
