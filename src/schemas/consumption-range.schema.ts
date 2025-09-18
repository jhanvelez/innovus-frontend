import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const consumptionRangeInitialValues = {
  stratumId: '',
  min: '',
  max: '',
  type: '',
  rate: '',
};

export const consumptionRangeValidationSchema = Yup.object({
  stratumId: Yup.string().required(FIELD_REQUIRED_MESSAGE),
  min: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  max: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
  type: Yup.string().required(FIELD_REQUIRED_MESSAGE),
  rate: Yup.number().min(0).required(FIELD_REQUIRED_MESSAGE),
});
