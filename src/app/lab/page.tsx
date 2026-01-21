import Link from "next/link";
import { BookOpen, FlaskConical, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LabPage() {
    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-24 space-y-12 animate-rise-in">
            <header className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                    <FlaskConical className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    <h1 className="text-4xl font-bold tracking-tight font-heading">The Lab</h1>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    A collection of experimental tools, features, and ideas.
                    Some are useful, some are just for fun. All are built by me.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Experiment Card: The Library */}
                <Link href="/lab/books" className="group block h-full">
                    <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg bg-card/50 hover:bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                                <BookOpen className="h-8 w-8 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                <Badge variant="secondary" className="font-medium tracking-wide opacity-80">Beta</Badge>
                            </div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors">The Library</CardTitle>
                            <CardDescription className="text-base mt-2">
                                A private, cloud-synced book reader for PDFs and EPUBs.
                                Tracks progress across devices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                Enter Library <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/lab/learning" className="group block h-full">
                    <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg bg-card/50 hover:bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                                <Sparkles className="h-8 w-8 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                <Badge variant="secondary" className="font-medium tracking-wide opacity-80">New</Badge>
                            </div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors">Learning Hub</CardTitle>
                            <CardDescription className="text-base mt-2">
                                A shelf for experiments in Ui systems, state models, and interaction design.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                Explore Modules <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/lab/faq" className="group block h-full">
                    <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg bg-card/50 hover:bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                                <MessageCircle className="h-8 w-8 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                <Badge variant="secondary" className="font-medium tracking-wide opacity-80">Info</Badge>
                            </div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors">Faq</CardTitle>
                            <CardDescription className="text-base mt-2">
                                A quick interactive guide to learn more about me.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                Start Chat <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                {/* Placeholder for future experiments */}
                <Card className="h-full border-dashed bg-muted/10 flex items-center justify-center min-h-[250px] hover:bg-muted/20 transition-colors">
                    <CardContent className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">More coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
