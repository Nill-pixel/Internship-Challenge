import EditTask from "~/pages/EditTask";
import type { Route } from "./+types/home";
import TaskDetail from "~/pages/TaskDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <TaskDetail />;
}
