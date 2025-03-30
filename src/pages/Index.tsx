
import { Provider } from 'react-redux';
import { store } from '@/store';
import Header from '@/components/Dashboard/Header';
import QueryInput from '@/components/Dashboard/QueryInput';
import QueryHistory from '@/components/Dashboard/QueryHistory';
import ResultsDisplay from '@/components/Dashboard/ResultsDisplay';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Header />
          
          <div className="mb-8 mt-6">
            <QueryInput />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <QueryHistory />
            </div>
            
            <div className="md:col-span-2">
              <ResultsDisplay />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Index;
