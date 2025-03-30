import { Card, CardContent, CardHeader, CardTitle,CardDescription} from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell} from "recharts";
import { CircleCheck, Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define chart colors
const COLORS = ['#4361ee', '#7209b7', '#4cc9f0', '#3a0ca3', '#9b87f5'];


const NoResults = () => (
  <div className="flex flex-col items-center justify-center h-[350px] text-center bg-white rounded-md shadow-purple-300 shadow-xl">
    <div className="w-14 h-14 mb-4 rounded-full bg-purple-500 flex items-center justify-center">
      <CircleCheck className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-lg font-medium mb-1">No query results yet</h3>
    <p className="text-muted-foreground max-w-md">
      Enter a question in the query box above to analyze your data
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-[350px] text-center shadow-purple-300 shadow-xl">
    <div className="w-16 h-16 mb-4 rounded-full bg-analytics-lightPurple/10 flex items-center justify-center animate-pulse">
      <Loader2 className="h-8 w-8 text-analytics-purple animate-spin" />
    </div>
    <h3 className="text-lg font-medium mb-1">Analyzing data</h3>
    <p className="text-muted-foreground">
      Processing your query using AI...
    </p>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <Alert variant="destructive" className="mx-auto max-w-lg my-10">
    <AlertTitle>Error processing query</AlertTitle>
    <AlertDescription>
      {error || "Something went wrong. Please try again."}
    </AlertDescription>
  </Alert>
);

const ChartRenderer = ({ type, data }: { type: string; data: any }) => {
  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.labels.map((label: string, i: number) => ({
            name: label,
            value: data.datasets[0].data[i]
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name={data.datasets[0].name} fill="#4361ee" />
          </BarChart>
        </ResponsiveContainer>
      );
      
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.labels.map((label: string, i: number) => ({
            name: label,
            ...data.datasets.reduce((obj: any, dataset: any, j: number) => {
              obj[dataset.name] = dataset.data[i];
              return obj;
            }, {})
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset: any, i: number) => (
              <Line 
                key={i} 
                type="monotone" 
                dataKey={dataset.name} 
                stroke={COLORS[i % COLORS.length]} 
                activeDot={{ r: 8 }} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
      
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.labels.map((label: string, i: number) => ({
                name: label,
                value: data.datasets[0].data[i]
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.labels.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
      
    case 'area':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.labels.map((label: string, i: number) => ({
            name: label,
            value: data.datasets[0].data[i]
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" name={data.datasets[0].name} fill="#7209b7" stroke="#4361ee" />
          </AreaChart>
        </ResponsiveContainer>
      );
      
    default:
      return <div>Unsupported chart type</div>;
  }
};

const ResultsDisplay = () => {
  const { results, status, error } = useAppSelector(state => state.query);
  
  // Show loading state
  if (status === 'loading') {
    return <LoadingState />;
  }
  
  // Show error state
  if (status === 'failed') {
    return <ErrorState error={error || ""} />;
  }
  
  // Show empty state if no results
  if (results.length === 0) {
    return <NoResults />;
  }
  
  // Display the latest result
  const latestResult = results[0];
  
  return (
    <Card className="w-full shadow-purple-300 shadow-xl">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          {latestResult.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartRenderer 
          type={latestResult.chart.type} 
          data={latestResult.chart.data} 
        />
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
