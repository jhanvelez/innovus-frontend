import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const tariffInitialValues = {
  userType: '',
  stratum: '',
  fixedCharge: '',
  variableCharge: '',
  subsidyPercent: '',
  contributionPercent: '',
  year: new Date().getFullYear().toString(),
  month: (new Date().getMonth() + 1).toString(),
};

export const tariffValidationSchema = Yup.object({
  userType: Yup.string().max(50).required(FIELD_REQUIRED_MESSAGE),
  stratum: Yup.number().min(0).max(6).required(FIELD_REQUIRED_MESSAGE),
  fixedCharge: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  variableCharge: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  subsidyPercent: Yup.number().min(0).max(100).required(FIELD_REQUIRED_MESSAGE),
  contributionPercent: Yup.number().min(0).max(100).required(FIELD_REQUIRED_MESSAGE),
  year: Yup.number().min(2000).required(FIELD_REQUIRED_MESSAGE),
  month: Yup.number().min(1).max(12).required(FIELD_REQUIRED_MESSAGE),
});
