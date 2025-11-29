"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploaderProps {
    onUploadComplete: () => void;
}

export default function Uploader({ onUploadComplete }: UploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setStatus("idle");

        try {
            await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });

            setStatus("success");
            onUploadComplete();

            // Reset after 3 seconds
            setTimeout(() => {
                setStatus("idle");
                if (e.target) e.target.value = "";
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative group w-full">
            <input
                type="file"
                accept=".pdf,.epub"
                onChange={handleFileChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />

            <div className={cn(
                "flex flex-col items-center justify-center gap-2 px-6 py-8 rounded-xl border-2 border-dashed transition-all duration-200 text-center",
                status === 'error' ? 'border-destructive/50 bg-destructive/10' :
                    status === 'success' ? 'border-green-500/50 bg-green-500/10' :
                        'border-muted-foreground/25 hover:border-muted-foreground/50 bg-muted/50 hover:bg-muted'
            )}>
                {uploading ? (
                    <>
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Uploading...</span>
                    </>
                ) : status === 'success' ? (
                    <>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <span className="text-sm font-medium text-green-500">Uploaded!</span>
                    </>
                ) : status === 'error' ? (
                    <>
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <span className="text-sm font-medium text-destructive">Error uploading</span>
                    </>
                ) : (
                    <>
                        <Upload className="w-8 h-8 text-muted-foreground/70 mb-2" strokeWidth={1.5} />
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Click or drag file to upload</p>
                            <p className="text-xs text-muted-foreground">PDF or EPUB</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
