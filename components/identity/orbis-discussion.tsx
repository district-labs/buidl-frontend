// @ts-nocheck
import { useState } from 'react';

import { Discussion } from '@orbisclub/components';
import { useContractEvent } from 'wagmi';

import '@orbisclub/components/dist/index.modern.css';
import ERC20ABI from '../../abis/MintableERC20.json';
import { useToken } from '../../lib/state';

// https://useorbis.com/documentation
export default function OrbisDiscussion() {
  const [token] = useToken();
  const [event, setEvent] = useState<{
    from: string;
    to: string;
    amount: string;
  }>();

  useContractEvent({
    address: token,
    abi: ERC20ABI.abi,
    eventName: 'Transfer',
    listener(from, to, amount) {
      if (from == constants.AddressZero) {
        setEvent({
          from,
          to,
          amount,
        });
      }
    },
  });

  return (
    <div className="card">
      <Discussion context="kjzl6cwe1jw148rf0mn8whed46zub3qnpjkoo5wafpebvxl3ux51vjfmn5yyk94:buidl-week" />
    </div>
  );
}
