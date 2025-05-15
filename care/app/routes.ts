import { flatRoutes } from "@remix-run/fs-routes";
import { layout, type RouteConfig } from "@remix-run/route-config";
import { hydrogenRoutes } from "@shopify/hydrogen";

export default hydrogenRoutes([
  // Your entire app reading from routes folder using Layout from root.tsx
  layout("./root.tsx", await flatRoutes()),
]) satisfies RouteConfig;
