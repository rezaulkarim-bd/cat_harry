// Private Route — /add-studio
// TODO (auth): before shipping, verify the session here server-side and
// redirect unauthenticated hosts to /login. The form's read-only user fields
// should also come from the session, not placeholder values.
import { AddStudioForm } from "@/app/add-studio/add-studio-form";
import { SectionHeading } from "@/components/section-heading";

// TODO: replace with the real session user.
const DEMO_HOST = { name: "Harry Cat", email: "harry@studiospace.com" };

export const metadata = { title: "Add New Studio — StudioSpace" };

export default function AddStudioPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <SectionHeading
        eyebrow="List Your Space"
        title="Add New Studio"
        subtitle="All fields are stored in the studios collection — your listing appears on the home page and in search once saved."
      />
      <div className="mt-8">
        <AddStudioForm user={DEMO_HOST} />
      </div>
    </main>
  );
}
