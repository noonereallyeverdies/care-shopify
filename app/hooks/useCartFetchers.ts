import {useFetchers} from '@remix-run/react';

export function useCartFetchers(actionId: string) {
  const fetchers = useFetchers();
  const cartFetchers = [];

  for (const fetcher of fetchers) {
    const formData = fetcher.formData;
    if (!formData) continue;

    const formActionId = formData.get('cartAction');
    if (!formActionId) continue;

    if (formActionId === actionId) {
      cartFetchers.push(fetcher);
    }
  }

  return cartFetchers;
}
