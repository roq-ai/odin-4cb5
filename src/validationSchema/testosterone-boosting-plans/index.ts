import * as yup from 'yup';

export const testosteroneBoostingPlanValidationSchema = yup.object().shape({
  plan_details: yup.string().required(),
  progress: yup.string(),
  client_id: yup.string().nullable().required(),
});
