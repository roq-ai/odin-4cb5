import { TestosteroneBoostingPlanInterface } from 'interfaces/testosterone-boosting-plan';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  testosterone_boosting_plan?: TestosteroneBoostingPlanInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    testosterone_boosting_plan?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
