"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "rewards" | "profile" | "menu";
  className?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder, className, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const { url } = await res.json();
        onChange(url);
        setPreview(url);
      } catch (err) {
        console.error("Image upload failed:", err);
        setPreview(value);
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [folder, onChange, value]
  );

  const handleRemove = useCallback(() => {
    onChange("");
    setPreview("");
  }, [onChange]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-xs font-semibold text-muted">{label}</label>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-line">
          <img
            src={preview}
            alt="Uploaded image"
            className="h-32 w-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 h-6 w-6"
            disabled={uploading}
          >
            <X className="h-3 w-3" />
          </Button>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-line bg-surface-soft transition hover:border-purple/40 hover:bg-purple-wash"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted" />
          ) : (
            <div className="text-center">
              <ImagePlus className="mx-auto h-6 w-6 text-muted" />
              <p className="mt-1 text-[11px] font-semibold text-muted">Click to upload</p>
            </div>
          )}
        </button>
      )}
    </div>
  );
}
