import { validateLocaleParameter } from "~/lib/locale-utils";
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export async function loader({params, context}: LoaderFunctionArgs) {
  validateLocaleParameter({params, context} as LoaderFunctionArgs);
  throw new Response('Not found', {status: 404});
}

export default function Component() {
  return null;
}
