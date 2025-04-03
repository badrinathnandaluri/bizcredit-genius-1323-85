
/**
 * Risk Assessment Service
 * This service handles enhanced credit risk assessment calculations
 * with improved model accuracy and dynamic scoring
 */

import { RiskAssessment } from '@/types';

/**
 * Calculate a dynamic risk score based on multiple business data points
 * @param userId - The user ID to calculate score for
 * @param businessData - Optional business data for more accurate calculation
 * @returns A score between 0-100
 */
export const calculateDynamicRiskScore = (
  userId: string,
  businessData?: Record<string, any>
): number => {
  // Base score characteristics - would ideally come from trained model
  const baseRanges = {
    min: 30,
    max: 95,
    median: 72
  };
  
  // In a real application, this would use actual data from the user's profile
  // and transaction history to determine the score
  
  // For demo purposes, generate a score with some randomness
  // but weighted towards realistic distribution
  const baseScore = Math.floor(
    // Normal-like distribution around median
    baseRanges.median + 
    (Math.random() + Math.random() - 1) * 
    ((baseRanges.max - baseRanges.min) / 2)
  );
  
  // Apply business data factors if available
  let adjustedScore = baseScore;
  if (businessData) {
    // Apply various adjustments based on business data
    if (businessData.yearsInBusiness) {
      adjustedScore += Math.min(businessData.yearsInBusiness * 2, 10);
    }
    
    if (businessData.monthlyRevenue) {
      adjustedScore += Math.log10(businessData.monthlyRevenue) * 2;
    }
    
    // Additional factors would be considered in a real model
  }
  
  // Ensure score is within valid range
  return Math.min(Math.max(Math.round(adjustedScore), baseRanges.min), baseRanges.max);
};

/**
 * Update risk assessment with new data points (training)
 * @param assessment - The current risk assessment
 * @param newDataPoints - New financial data points for model training
 * @returns Updated risk assessment
 */
export const trainModelWithNewData = (
  assessment: RiskAssessment,
  newDataPoints: Array<{
    name: string;
    impact: number;
    description: string;
  }>
): RiskAssessment => {
  // In a real application, this would actually train the model
  
  // For demo purposes, we're just updating the assessment with new factors
  const updatedFactors = [
    ...assessment.factors,
    ...newDataPoints
  ].slice(0, 6); // Keep only the 6 most relevant factors
  
  // Recalculate suggested terms based on updated risk profile
  const updatedInterestRate = assessment.suggestedInterestRate * 
    (1 + (Math.random() * 0.1 - 0.05)); // +/- 5%
    
  const updatedLoanAmount = assessment.maxLoanAmount *
    (1 + (Math.random() * 0.2 - 0.1)); // +/- 10%
    
  return {
    ...assessment,
    factors: updatedFactors,
    suggestedInterestRate: Number(updatedInterestRate.toFixed(2)),
    maxLoanAmount: Math.round(updatedLoanAmount)
  };
};

export default {
  calculateDynamicRiskScore,
  trainModelWithNewData
};
