
import { QueryResult } from '@/store/querySlice';

// Helper function to generate random data
const generateRandomData = (length: number, min: number, max: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Mock data for different query types
const mockDataSets = {
  sales: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          name: 'Sales',
          data: generateRandomData(12, 5000, 15000),
          fill: 'solid',
        }
      ]
    },
    summary: 'Sales have shown consistent growth throughout the year with a peak in November.'
  },
  
  customers: {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          name: 'New Customers',
          data: generateRandomData(12, 100, 500),
          fill: 'solid',
        },
        {
          name: 'Returning Customers',
          data: generateRandomData(12, 200, 800),
          fill: 'solid',
        }
      ]
    },
    summary: 'Customer acquisition has been growing steadily, with particularly strong growth in Q2.'
  },
  
  categories: {
    type: 'pie',
    data: {
      labels: ['Electronics', 'Clothing', 'Food', 'Home Goods', 'Beauty'],
      datasets: [
        {
          name: 'Revenue by Category',
          data: generateRandomData(5, 10000, 50000),
          fill: 'solid',
        }
      ]
    },
    summary: 'Electronics and Clothing continue to be our top revenue categories, accounting for over 60% of total sales.'
  },
  
  marketing: {
    type: 'area',
    data: {
      labels: ['Organic Search', 'Paid Search', 'Social Media', 'Email', 'Direct', 'Referral'],
      datasets: [
        {
          name: 'Conversion Rate (%)',
          data: generateRandomData(6, 1, 10),
          fill: 'solid',
        }
      ]
    },
    summary: 'Email marketing shows the highest conversion rate at 8.2%, followed by paid search at 5.4%.'
  }
};

// Helper to determine which dataset to return based on query
const determineDatasetType = (query: string): keyof typeof mockDataSets => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('sales')) return 'sales';
  if (lowerQuery.includes('customer') || lowerQuery.includes('growth')) return 'customers';
  if (lowerQuery.includes('category') || lowerQuery.includes('product')) return 'categories';
  if (lowerQuery.includes('conversion') || lowerQuery.includes('marketing')) return 'marketing';
  
  // Default to sales if no match
  return 'sales';
};

export const mockQueryProcess = async (query: string): Promise<QueryResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const datasetType = determineDatasetType(query);
  const dataset = mockDataSets[datasetType];
  
  return {
    id: `query-${Date.now()}`,
    chart: {
      type: dataset.type as 'bar' | 'line' | 'pie' | 'area',
      data: dataset.data
    },
    summary: dataset.summary,
    timestamp: new Date().toISOString()
  };
};
