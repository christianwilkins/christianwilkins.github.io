import { Link } from "react-router-dom";
import { ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <CardTitle>{feature} is paused during the Cloudflare migration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This tool depended on Vercel server APIs and storage. The public site is ready for
              Cloudflare Pages; this feature needs a Cloudflare-native backend before it can be
              turned back on.
            </p>
            <p>
              Planned replacement: Pages Functions or Workers for APIs, R2 for files, and a
              Cloudflare-compatible auth/session path.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
