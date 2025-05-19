import { validateLocaleParameter } from "~/lib/locale-utils";
export async function loader() {
  validateLocaleParameter(args);  throw new Response('Not found', {status: 404});
}

export default function Component() {
  return null;
}
