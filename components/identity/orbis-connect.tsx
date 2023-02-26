import { useState } from 'react';

import classNames from 'clsx';
import { useSigner } from 'wagmi';

import { orbis } from '@/lib/orbis';
import { useDID } from '@/lib/state-did';

interface OrbisConnectProps {
  className?: string;
  label?: string;
}

export const OrbisConnect = ({
  className,
  label = 'Connect',
}: OrbisConnectProps) => {
  const [did, setDid] = useDID();
  const { data } = useSigner();
  async function connect() {
    let res = await orbis.connect(data?.provider?.provider, false);
    if (res.status == 200) {
      setDid(res.did);
    } else {
      console.log('Error connecting to Ceramic: ', res);
      alert('Error connecting to Ceramic.');
    }
  }

  const classes = classNames(className, 'OrbisConnect');
  return (
    <>
      <div className="flex flex-col gap-3">
        <button className={classes} onClick={() => connect()}>
          {label}
        </button>
        {did && <span className="block text-xs">{did}</span>}
      </div>
    </>
  );
};

export default OrbisConnect;
