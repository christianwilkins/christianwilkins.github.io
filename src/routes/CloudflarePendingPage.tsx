import { Link } from "react-router-dom";
import { ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CloudflarePendingPage({ feature }: { feature: string }) {
  return (
    <div className="min-h-[65vh] px-5 py-10 md:px-10 lg:px-16 animate-rise-in">
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/lab" aria-label="Back to The Lab">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70">
              <Cloud className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold">{feature} is temporarily unavailable</h1>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>This tool is paused while I update it. You can explore the Learning Hub or the other projects in The Lab.</p>
            <Link to="/lab/learning" className="ui-link inline-flex min-h-11 items-center">Explore the Learning Hub</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
