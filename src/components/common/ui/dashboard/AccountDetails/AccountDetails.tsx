import React from 'react';

import { AvatarAndName } from './AvatarAndName';
import { TestStats } from './TestStats';

export const AccountDetails = () => {
  return (
    <div className="flex size-[300px] flex-col gap-8 whitespace-nowrap rounded-lg border border-secondary/70 p-4">
      <AvatarAndName />
      <TestStats />
    </div>
  );
};
