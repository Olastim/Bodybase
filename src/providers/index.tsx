'use client';

import React from 'react';
import {PrivyProvider} from './PrivyProvider';

export function AppProviders({children}: {children: React.ReactNode}) {
  return <PrivyProvider>{children}</PrivyProvider>;
}
