/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, utils } from 'ethers';

import {
  useErc20Decimals,
  useErc20Name,
  useErc20Symbol,
  useErc20TotalSupply,
} from '../../lib/blockchain';
import { useToken } from '../../lib/state';
import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

function ERC20Image({
  address,
}: {
  address?: `0x${string}`;
  className?: string;
}) {
  const { data } = useErc20Name({
    address: address,
  });
  return (
    <img
      alt={`Token ${address} icon`}
      className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
      src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
    />
  );
}

function ERC20Name({
  address,
  className,
}: {
  address?: `0x${string}`;
  className?: string;
}) {
  const { data } = useErc20Name({
    address: address,
  });
  return <span className={className}>{data}</span>;
}

function ERC20Symbol({
  address,
  className,
}: {
  address?: `0x${string}`;
  className?: string;
}) {
  const { data } = useErc20Symbol({
    address: address,
  });
  return <span className={className}>{data}</span>;
}

function ERC20TotalSupply({
  address,
  className,
}: {
  address?: `0x${string}`;
  className?: string;
}) {
  const { data } = useErc20TotalSupply({
    address: address,
  });
  return (
    <span className={className}>
      {utils.formatUnits(data || BigNumber.from(0))}
    </span>
  );
}

// @TODO: Add Decimals to Display
function ERC20Decimals({
  address,
  className,
}: {
  address?: `0x${string}`;
  className?: string;
}) {
  const { data } = useErc20Decimals({
    address: address,
  });
  return <span className={className}>{data}</span>;
}

export default function ERC20Read() {
  const [token] = useToken();

  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div>
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <span className="text-3xl">
                <ERC20Name address={token as `0x${string}`} />
                <span className="ml-2">
                  (
                  <ERC20Symbol address={token as `0x${string}`} />)
                </span>
              </span>
              <p className="text-xl">
                Decimals <ERC20Decimals address={token as `0x${string}`} />
              </p>
              <p className="text-xl">
                Total Supply{' '}
                <ERC20TotalSupply address={token as `0x${string}`} />
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <h3 className="text-center">ERC20 Read</h3>
        </div>
        <div className="flex items-center justify-center gap-10">
          <>
            <ConnectButton />
          </>
        </div>
      </BranchIsWalletConnected>
    </div>
  );
}
