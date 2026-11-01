"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader, Plus, ImageIcon, Camera } from "lucide-react";
import { toast } from "@/components/ui/toast";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createStudioAction, uploadImageAction } from "@/app/add-studio/actions";
import { AMENITY_OPTIONS, STUDIO_CATEGORIES } from "@/app/add-studio/constants";

function Field({ label, htmlFor, hint = null, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function AddStudioForm({ user = { name: "Harry Cat", email: "harry@studiospace.com" } }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    overview: "",
  });
  const [amenities, setAmenities] = useState([]);

  const setField = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  function toggleAmenity(amenity) {
    setAmenities((previous) =>
      previous.includes(amenity)
        ? previous.filter((item) => item !== amenity)
        : [...previous, amenity]
    );
  }

  async function handleImageSelected(event) {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
      toast.add({ type: "error", title: "Unsupported file", description: "Use a JPEG, PNG, WebP, or GIF image." });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.add({ type: "error", title: "Image too large", description: "imgbb accepts up to 8 MB per image." });
      return;
    }

    setIsUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.readAsDataURL(file);
      });
      const base64 = dataUrl.replace(/^data:.+;base64,/, "");
      const result = await uploadImageAction(base64);
      if (!result.ok) {
        toast.add({ type: "error", title: "Upload failed", description: result.error });
        return;
      }
      setForm((previous) => ({ ...previous, image: result.url }));
      toast.add({ type: "success", title: "Image uploaded", description: result.url, timeout: 4000 });
    } finally {
      setIsUploading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    startTransition(async () => {
      const result = await createStudioAction({
        ...form,
        amenities,
        // TODO: replace these demo fields with the real authenticated session
        hostEmail: user.email,
        hostName: user.name,
      });

      if (!result.ok) {
        toast.add({ type: "error", title: "Couldn't add studio", description: result.error });
        return;
      }

      toast.add({
        type: "success",
        title: "Studio added",
        description: "“" + form.title + "” is now saved to your listings.",
      });
      router.push("/my-listings");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Studio Title" htmlFor="studio-title" hint="Shown in search results.">
          <Input
            id="studio-title"
            placeholder="e.g. Northside Sound Lab"
            value={form.title}
            onChange={setField("title")}
            required
            maxLength={80}
          />
        </Field>

        <Field label="Category" htmlFor="studio-category">
          <Select
            value={form.category}
            onValueChange={(value) => setForm((previous) => ({ ...previous, category: value }))}
            required
          >
            <SelectTrigger id="studio-category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {STUDIO_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Hourly Rate ($)" htmlFor="studio-rate" hint="Per hour of studio time.">
          <Input
            id="studio-rate"
            type="number"
            min="1"
            max="10000"
            step="1"
            placeholder="35"
            value={form.hourlyRate}
            onChange={setField("hourlyRate")}
            required
          />
        </Field>

        <Field label="Security Deposit ($)" htmlFor="studio-deposit" hint="Refundable after an incident-free shoot.">
          <Input
            id="studio-deposit"
            type="number"
            min="0"
            max="100000"
            step="1"
            placeholder="100"
            value={form.securityDeposit}
            onChange={setField("securityDeposit")}
          />
        </Field>

        <Field label="Max Capacity" htmlFor="studio-capacity" hint="Maximum people allowed per session.">
          <Input
            id="studio-capacity"
            type="number"
            min="1"
            max="1000"
            step="1"
            placeholder="12"
            value={form.maxCapacity}
            onChange={setField("maxCapacity")}
            required
          />
        </Field>

        <Field label="Location / Address" htmlFor="studio-location">
          <Input
            id="studio-location"
            placeholder="Street, city, or neighborhood"
            value={form.location}
            onChange={setField("location")}
            required
            maxLength={160}
          />
        </Field>
      </div>

      {/* Image upload via imgbb, or paste an existing URL */}
      <Field
        label="Studio Image"
        htmlFor="studio-image-url"
        hint="Upload to imgbb (key set server-side) or paste an image URL directly."
      >
        <div className="flex items-start gap-3">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
            {isUploading ? (
              <Loader className="size-5 animate-spin text-muted-foreground" />
            ) : form.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="Studio preview" className="size-full object-cover" />
            ) : (
              <ImageIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Input
              id="studio-image-url"
              type="url"
              placeholder="https://i.ibb.co/…"
              value={form.image}
              onChange={setField("image")}
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              render={<label className="cursor-pointer" />}
            >
              {isUploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={handleImageSelected}
              />
            </Button>
          </div>
        </div>
      </Field>

      {/* Amenities as toggle tags */}
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((amenity) => {
            const selected = amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleAmenity(amenity)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  selected
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {selected ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      <Field
        label="Detailed Overview"
        htmlFor="studio-overview"
        hint="Describe the space, gear, and what makes it great to shoot in (min 30 characters)."
      >
        <Textarea
          id="studio-overview"
          placeholder="Tell creators about the room size, gear, acoustics, parking, and anything else that matters…"
          rows={6}
          value={form.overview}
          onChange={setField("overview")}
          required
          minLength={30}
          maxLength={2000}
        />
      </Field>

      {/* Read-only user identity, filled by the host listing the studio */}
      <div className="grid gap-6 rounded-lg border bg-muted/40 p-4 sm:grid-cols-2">
        <Field label="Host Name" htmlFor="studio-host-name" hint="Read-only — signed in user.">
          <Input id="studio-host-name" value={user.name} readOnly />
        </Field>
        <Field label="Host Email" htmlFor="studio-host-email" hint="Read-only — signed in user.">
          <Input id="studio-host-email" type="email" value={user.email} readOnly />
        </Field>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending || isUploading}>
        {isPending ? <Loader className="animate-spin" /> : <Camera />}
        {isPending ? "Saving studio…" : "Add New Studio"}
      </Button>
    </form>
  );
}
