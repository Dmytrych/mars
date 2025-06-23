'use client'

import {ReactNode} from 'rea'

interface IProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <>
      {children}
    </>
  );
}

export default Providers
