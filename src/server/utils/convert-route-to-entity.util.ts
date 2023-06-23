const mapping: Record<string, string> = {
  clients: 'client',
  organizations: 'organization',
  'testosterone-boosting-plans': 'testosterone_boosting_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
