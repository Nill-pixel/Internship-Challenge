import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route("tasks/new", "routes/new.tsx"),
route("tasks/:id", "routes/details.tsx"),
route("tasks/:id/edit", "routes/edit.tsx"),
] satisfies RouteConfig;
