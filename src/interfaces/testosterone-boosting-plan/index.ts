import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface TestosteroneBoostingPlanInterface {
  id?: string;
  client_id: string;
  plan_details: string;
  progress?: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface TestosteroneBoostingPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
  plan_details?: string;
  progress?: string;
}
