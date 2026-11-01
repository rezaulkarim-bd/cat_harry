import { redirect } from "next/navigation";

// Legacy path: the required route is /add-studio.
export default function AddNewStudioPage() {
  redirect("/add-studio");
}
