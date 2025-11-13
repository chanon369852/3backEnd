import { Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { prisma } from '../utils/prisma';

export const naturalLanguageQuery = async (req: TenantRequest, res: Response) => {
  const { query, language = 'th' } = req.body;

  // TODO: Implement NLP logic with OpenAI
  const aiQuery = await prisma.aiQuery.create({
    data: {
      query,
      language,
      tenantId: req.tenantId!,
      userId: req.userId,
      response: 'AI response will be implemented',
    },
  });

  res.json({
    query,
    response: 'AI-powered natural language query - Coming soon',
    data: aiQuery,
  });
};

export const getInsights = async (req: TenantRequest, res: Response) => {
  const { status, priority } = req.query;

  const insights = await prisma.aiInsight.findMany({
    where: {
      tenantId: req.tenantId!,
      ...(status && { status: status as string }),
      ...(priority && { priority: priority as string }),
    },
    include: {
      campaign: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  res.json({ insights });
};

export const getInsightById = async (req: TenantRequest, res: Response) => {
  const { id } = req.params;

  const insight = await prisma.aiInsight.findFirst({
    where: { id, tenantId: req.tenantId! },
    include: { campaign: true },
  });

  res.json({ insight });
};

export const actionInsight = async (req: TenantRequest, res: Response) => {
  const { id } = req.params;

  const insight = await prisma.aiInsight.updateMany({
    where: { id, tenantId: req.tenantId! },
    data: {
      status: 'actioned',
      actionedAt: new Date(),
    },
  });

  res.json({ insight, message: 'Insight actioned successfully' });
};

export const dismissInsight = async (req: TenantRequest, res: Response) => {
  const { id } = req.params;

  const insight = await prisma.aiInsight.updateMany({
    where: { id, tenantId: req.tenantId! },
    data: { status: 'dismissed' },
  });

  res.json({ insight, message: 'Insight dismissed' });
};

export const analyzeData = async (req: TenantRequest, res: Response) => {
  // TODO: Implement data analysis logic
  res.json({ message: 'AI Data Analysis - Coming soon' });
};

export const predictTrends = async (req: TenantRequest, res: Response) => {
  // TODO: Implement trend prediction logic
  res.json({ message: 'AI Trend Prediction - Coming soon' });
};

export const getRecommendations = async (req: TenantRequest, res: Response) => {
  // TODO: Implement recommendation engine
  res.json({ message: 'AI Recommendations - Coming soon' });
};

export const whatIfAnalysis = async (req: TenantRequest, res: Response) => {
  // TODO: Implement what-if analysis
  res.json({ message: 'What-if Analysis - Coming soon' });
};
