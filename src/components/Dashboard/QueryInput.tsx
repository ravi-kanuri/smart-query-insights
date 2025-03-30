
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { 
  useAppDispatch, 
  useAppSelector 
} from "@/hooks/useRedux";
import { 
  setCurrentQuery, 
  processQuery 
} from "@/store/querySlice";

const QueryInput = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const currentQuery = useAppSelector(state => state.query.currentQuery);
  const status = useAppSelector(state => state.query.status);
  const suggestions = useAppSelector(state => state.query.suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isLoading = status === 'loading';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentQuery.trim()) {
      toast({
        title: "Query cannot be empty",
        description: "Please enter a question or select a suggestion.",
        variant: "destructive"
      });
      return;
    }

    dispatch(processQuery(currentQuery));
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
  };

  useEffect(() => {
    // Show suggestions when input is focused and query is empty
    if (currentQuery === '') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [currentQuery]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-analytics-purple opacity-70" />
            </div>
            <Input
              placeholder="Ask a question about your data..."
              value={currentQuery}
              onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
              className="pl-10 pr-4 py-6 text-base rounded-lg border-2 border-muted focus:border-analytics-lightPurple focus-visible:ring-analytics-purple"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-analytics-blue hover:bg-analytics-purple transition-colors py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Query
              </>
            )}
          </Button>
        </div>
      </form>

      {/* AI Suggestions */}
      {showSuggestions && (
        <div className="mt-2 p-3 bg-white border rounded-lg shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-analytics-purple" />
            Suggested queries
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
