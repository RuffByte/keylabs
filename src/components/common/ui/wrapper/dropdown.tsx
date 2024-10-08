import React, { AnchorHTMLAttributes } from 'react';

import Button from '../../Button';
import TLink from '../transition/TLink';

interface DropdownProp extends React.HTMLAttributes<HTMLDivElement> {
  dropdownDisplay: React.ReactNode;
  dropdownItems: React.ReactNode;
  classname?: string;
}

export const Dropdown = ({
  dropdownDisplay,
  dropdownItems,
  ...props
}: DropdownProp) => {
  return (
    <div {...props} className="relative select-none">
      <Button className="peer">{dropdownDisplay}</Button>
      <div className="absolute right-0 hidden w-40 pt-2 hover:flex peer-hover:flex">
        <div className="w-full rounded bg-secondary text-foreground outline outline-4 outline-background">
          {dropdownItems}
        </div>
      </div>
    </div>
  );
};

interface DropdownItemProp extends AnchorHTMLAttributes<HTMLAnchorElement> {
  dropdownItem: (React.ReactNode | string)[];
  href: string;
}

export const DropdownLinkItem = ({
  href,
  dropdownItem,
  ...props
}: DropdownItemProp) => {
  return (
    <TLink {...props} href={href}>
      {dropdownItem.map((item, i) => (
        <div
          key={i}
          className="flex w-full items-center justify-center px-4 py-2 text-background hover:bg-hover hover:text-background hover:shadow-md"
        >
          {item}
        </div>
      ))}
    </TLink>
  );
};
