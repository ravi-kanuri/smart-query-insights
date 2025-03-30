import { Badge } from "@/components/ui/badge";
import { Sparkles,LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <img src="/logoai.jpeg" className="h-9 w-9" />
          <span className="analytics-gradient-text">GenAI Insights</span>
          <Badge variant="outline" className="ml-2 bg-analytics-lightPurple/10 text-analytics-purple border-analytics-purple/20">
            <Sparkles className="h-3 w-3 mr-1" />
          
          </Badge>
        </h1>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-md border shadow-md shadow-purple-300">
        <LayoutDashboard className="h-6 w-6 text-analytics-purple" />
        <span className="font-medium text-foreground">Analytics Dashboard</span>
      </div>
    </div>
  );
};

export default Header;
