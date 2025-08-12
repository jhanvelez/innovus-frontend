import * as Yup from "yup";
import { FIELD_REQUIRED_MESSAGE } from "@/utils/validations";

export const propertyInitialValues = {
  cadastralRecord: '',
  address: '',
  subscriberId: '',
};

export const propertyValidationSchema = Yup.object({
  cadastralRecord: Yup.string().max(20).required(FIELD_REQUIRED_MESSAGE),
  address: Yup.string().max(255).required(FIELD_REQUIRED_MESSAGE),
  subscriberId: Yup.string().required(FIELD_REQUIRED_MESSAGE),
});
