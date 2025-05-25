import React from 'react';
import { NavLink, NavLinkProps } from '@remix-run/react';
import { useNavigation } from '../contexts/NavigationContext';

interface LocalizedNavLinkProps extends Omit<NavLinkProps, 'to'> {
  to: string;
}

export function LocalizedNavLink({ to, ...props }: LocalizedNavLinkProps) {
  const { localizeUrl } = useNavigation();
  const localizedTo = localizeUrl(to);
  
  return <NavLink to={localizedTo} {...props} />;
}

// Export a regular Link component as well
import { Link, LinkProps } from '@remix-run/react';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

export function LocalizedLink({ to, ...props }: LocalizedLinkProps) {
  const { localizeUrl } = useNavigation();
  const localizedTo = localizeUrl(to);
  
  return <Link to={localizedTo} {...props} />;
}
