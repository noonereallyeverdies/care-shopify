// Session server utilities for handling user sessions

import { createCookieSessionStorage } from '@shopify/remix-oxygen';

export class AppSession {
  public static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    const commit = () => storage.commitSession(session);
    const destroy = () => storage.destroySession(session);

    return Object.assign(session, {
      commit,
      destroy,
      isPending: session.data && Object.keys(session.data).length > 0,
    });
  }
}

// Additional session utilities
export interface SessionData {
  userId?: string;
  cartId?: string;
  theme?: 'light' | 'dark';
  locale?: string;
  returnTo?: string;
}

export function createSessionHelpers(session: any) {
  return {
    getUserId: (): string | undefined => session.get('userId'),
    setUserId: (userId: string) => session.set('userId', userId),
    getCartId: (): string | undefined => session.get('cartId'),
    setCartId: (cartId: string) => session.set('cartId', cartId),
    getTheme: (): 'light' | 'dark' => session.get('theme') || 'light',
    setTheme: (theme: 'light' | 'dark') => session.set('theme', theme),
    getLocale: (): string | undefined => session.get('locale'),
    setLocale: (locale: string) => session.set('locale', locale),
    getReturnTo: (): string | undefined => session.get('returnTo'),
    setReturnTo: (returnTo: string) => session.set('returnTo', returnTo),
    clear: () => {
      session.unset('userId');
      session.unset('cartId');
      session.unset('returnTo');
    },
  };
}