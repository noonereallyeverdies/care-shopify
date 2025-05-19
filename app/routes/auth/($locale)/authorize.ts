import { validateLocaleParameter } from "~/lib/locale-utils";
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context, params}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  return context.customerAccount.authorize();
}
