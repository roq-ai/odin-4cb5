import axios from 'axios';
import queryString from 'query-string';
import {
  TestosteroneBoostingPlanInterface,
  TestosteroneBoostingPlanGetQueryInterface,
} from 'interfaces/testosterone-boosting-plan';
import { GetQueryInterface } from '../../interfaces';

export const getTestosteroneBoostingPlans = async (query?: TestosteroneBoostingPlanGetQueryInterface) => {
  const response = await axios.get(
    `/api/testosterone-boosting-plans${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const createTestosteroneBoostingPlan = async (testosteroneBoostingPlan: TestosteroneBoostingPlanInterface) => {
  const response = await axios.post('/api/testosterone-boosting-plans', testosteroneBoostingPlan);
  return response.data;
};

export const updateTestosteroneBoostingPlanById = async (
  id: string,
  testosteroneBoostingPlan: TestosteroneBoostingPlanInterface,
) => {
  const response = await axios.put(`/api/testosterone-boosting-plans/${id}`, testosteroneBoostingPlan);
  return response.data;
};

export const getTestosteroneBoostingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/testosterone-boosting-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteTestosteroneBoostingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/testosterone-boosting-plans/${id}`);
  return response.data;
};
