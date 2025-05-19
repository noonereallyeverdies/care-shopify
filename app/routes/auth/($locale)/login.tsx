import { validateLocaleParameter } from "~/lib/locale-utils";
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  return context.customerAccount.login();
}
