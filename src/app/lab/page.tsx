import Link from "next/link";
import { BookOpen, FlaskConical, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LabPage() {
    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-24 space-y-12">
            <header className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <FlaskConical className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight font-heading">The Lab</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    A collection of experimental tools, features, and ideas.
                    Some are useful, some are just for fun. All are built by me.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Experiment Card: The Library */}
                <Link href="/lab/books" className="group block h-full">
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 rounded-md bg-primary/10 text-primary">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <Badge variant="outline">Beta</Badge>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">The Library</CardTitle>
                            <CardDescription>
                                A private, cloud-synced book reader for PDFs and EPUBs.
                                Tracks progress across devices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="ghost" className="p-0 h-auto group-hover:translate-x-1 transition-transform">
                                Enter Library <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </Link>

                {/* Placeholder for future experiments */}
                <Card className="h-full border-dashed bg-muted/30 flex items-center justify-center min-h-[250px]">
                    <CardContent className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">More coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
