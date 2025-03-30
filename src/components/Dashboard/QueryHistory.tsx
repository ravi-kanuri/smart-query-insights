import {  Card,  CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setCurrentQuery } from "@/store/querySlice";
import { formatDistanceToNow } from "date-fns";

const QueryHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.query.history);

  const handleRerun = (query: string) => {
    dispatch(setCurrentQuery(query));
  };

  return (
    <Card className="h-[400px] shadow-purple-300 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Clock className="h-5 w-5 mr-2 text-analytics-purple" />
          Recent Queries
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <Sparkles className="h-8 w-8 text-analytics-lightPurple mb-2 opacity-60" />
            <p className="text-muted-foreground">No queries yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your query history will appear here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {history.map((query) => (
                <div 
                  key={query.id} 
                  className="p-3 border rounded-lg hover:border-analytics-lightPurple transition-colors cursor-pointer group"
                  onClick={() => handleRerun(query.text)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium group-hover:text-analytics-purple transition-colors">
                      {query.text}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 opacity-70 hover:opacity-100 group-hover:bg-green-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRerun(query.text);
                      }}
                    >
                      Repost
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(query.timestamp), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryHistory;
