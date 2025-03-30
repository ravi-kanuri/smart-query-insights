
import { Badge } from "@/components/ui/badge";
import { Sparkles, Database, BrainCircuit } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-analytics-purple" />
          <span className="analytics-gradient-text">GenAI Analytics</span>
          <Badge variant="outline" className="ml-2 bg-analytics-lightPurple/10 text-analytics-purple border-analytics-purple/20">
            <Sparkles className="h-3 w-3 mr-1" />
            BETA
          </Badge>
        </h1>
        <p className="text-muted-foreground mt-2 ml-10">
          Ask questions about your data in natural language
        </p>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-md border shadow-sm">
        <Database className="h-4 w-4 text-analytics-purple" />
        <span>Connected to <span className="font-medium text-foreground">Analytics Database</span></span>
      </div>
    </div>
  );
};

export default Header;
