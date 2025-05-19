import { validateLocaleParameter } from "~/lib/locale-utils";
import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({params}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  return redirect(params?.locale ? `${params.locale}/products` : '/products');
}
