import { projects } from "@/data/projectsData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Projects() {
    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-6 font-heading">PROJECTS</h1>
            <p className="mb-8 text-lg leading-relaxed">
                Here are some of my recent projects. Each one represents different
                challenges and learning experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col h-full">
                        {project.image && (
                            <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                                {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> */}
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    Image Placeholder
                                </div>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <Badge key={idx} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                            {project.liveLink && (
                                <Link
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    Live Demo
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    GitHub
                                </Link>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
