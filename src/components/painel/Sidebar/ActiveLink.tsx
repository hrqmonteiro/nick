import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';
import useColorData from '../../../services/hooks/useColorData';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref=false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  const { color } = useColorData();

  let isActive = false;

  if (shouldMatchExactHref && asPath === rest.href || asPath === rest.as) {
    isActive = true;
  }

  if (!shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) ||
      asPath.startsWith(String(rest.as)))) {
    isActive = true;
  }


  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? color.colorButton : color.colorText,
      })}
    </Link>
  );
}