import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { testosteroneBoostingPlanValidationSchema } from 'validationSchema/testosterone-boosting-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.testosterone_boosting_plan
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTestosteroneBoostingPlanById();
    case 'PUT':
      return updateTestosteroneBoostingPlanById();
    case 'DELETE':
      return deleteTestosteroneBoostingPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTestosteroneBoostingPlanById() {
    const data = await prisma.testosterone_boosting_plan.findFirst(
      convertQueryToPrismaUtil(req.query, 'testosterone_boosting_plan'),
    );
    return res.status(200).json(data);
  }

  async function updateTestosteroneBoostingPlanById() {
    await testosteroneBoostingPlanValidationSchema.validate(req.body);
    const data = await prisma.testosterone_boosting_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTestosteroneBoostingPlanById() {
    const data = await prisma.testosterone_boosting_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
