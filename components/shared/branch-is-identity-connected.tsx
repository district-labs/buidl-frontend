import React from 'react';

import { useDID } from '@/lib/state-did';

interface BranchIsIdentityConnectedProps {
  children?: React.ReactElement | Array<React.ReactElement>;
}

export function BranchIsIdentityConnected({
  children,
}: BranchIsIdentityConnectedProps) {
  const [did] = useDID();

  if (did && children && !Array.isArray(children)) return children;
  if (did && Array.isArray(children)) return children[0];
  if (!did && Array.isArray(children)) return children[1];
}
