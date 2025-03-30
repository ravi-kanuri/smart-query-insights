# GenAI Insights  - Data Query Dashboard Prototype

A React-based dashboard prototype for a Gen AI Analytics tool that enables non-technical teams to query databases using natural language and visualize results instantly.

## Live Demo

[View Live Demo](https://smart-query-insights.onrender.com/)


## Technical Stack

- **Frontend Framework**: React
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Deployment**: Render


## Installation and Setup

1. Clone the repository:
   ```
   https://github.com/ravi-kanuri/smart-query-insights.git
   ```

2. Install dependencies:
   ```
   cd smart-query-insights
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Usage Guide

1. **Enter a Query**: Type your business question in the query input field
2. **Use Suggestions**: AI-powered suggestions that appear
3. **Submit Query**: Press Enter or click the Submit button to process your query
4. **View Results**: Explore the visualized data in the results section
5. **Review History**: Click on any previous query in the history section to rerun it

## Implementation Details

- **Query Processing Simulation**: Mimics AI processing with realistic timing
- **Mock Data Generation**: Creates relevant data based on query content
- **Responsive Layout**: Adapts to different screen sizes
- **Error Handling**: Gracefully manages incorrect queries and system errors

## Developer Notes

This prototype demonstrates the UI/UX and state management aspects of the Gen AI Analytics tool. In a production environment, it would connect to backend services for actual query processing and data retrieval.
