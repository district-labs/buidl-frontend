import { profile } from 'console';

import { useEffect, useState } from 'react';

import classNames from 'clsx';

import { orbis } from '@/lib/orbis';
import { useDID } from '@/lib/state-did';

interface OrbisGetCredentialsProps {
  className?: string;
}

export const OrbisGetCredentials = ({
  className,
}: OrbisGetCredentialsProps) => {
  const [did] = useDID();
  const [credentials, setCredentials] = useState();
  useEffect(() => {
    if (!did) return;
    (async () => {
      let { data, error } = await orbis.getCredentials(did);
      if (error) {
        console.log(error);
        return;
      }
      setCredentials(data);
    })();
  }, [did]);

  const classes = classNames(className, 'OrbisProfile');
  if (!credentials) return <div className={classes}>loading...</div>;
  return (
    <div className="mx-5 grid grid-cols-12 gap-10 gap-y-4 lg:mx-0 lg:gap-y-10">
      {credentials?.map((credential: any, idx: number) => {
        return (
          <div key={idx} className={'card col-span-12 lg:col-span-6'}>
            <h3 className="text-3xl font-bold">
              {credential?.content?.credentialSubject?.name}
            </h3>
            <p className="text-lg font-semibold">
              {credential?.content?.credentialSubject?.description}
            </p>
            <span className="tag tag-cloud mt-3">
              {credential?.content?.credentialSubject?.protocol}
            </span>
            <a
              target={'_blank'}
              className="btn btn-primary btn-sm btn-pill mt-4 inline-block w-full"
              href={`https://cerscan.com/mainnet/stream/${credential?.stream_id}`}
              rel="noreferrer"
            >
              View Credential Stream
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default OrbisGetCredentials;

// {
//   "stream_id": "kjzl6cwe1jw1460gxw0mhh0qunek5zup84wbk1ey3yfsdj8dwlrmqpgpld074eg",
//   "issuer": "did:key:z6mkfglpulq7vvxu93xrh1mlgha5fmutcgmuwkz1vuwt3qju",
//   "subject_id": "did:pkh:eip155:1:0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
//   "content": {
//       "issuer": {
//           "id": "did:key:z6MkfGLpuLq7vVXU93xRH1mLghA5FmutCGmUWKZ1VuwT3QJu",
//           "name": "Orbis Protocol"
//       },
//       "@context": [
//           "https://www.w3.org/2018/credentials/v1"
//       ],
//       "issuanceDate": "1676901762",
//       "credentialSubject": {
//           "id": "did:pkh:eip155:1:0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
//           "name": "Polygon",
//           "type": "active-wallet-polygon",
//           "network": "EVM",
//           "protocol": "nonces",
//           "description": "Has performed transactions on Polygon."
//       }
//   },
//   "provider": null,
//   "created_at": "2023-02-20T14:02:42.891825+00:00",
//   "timestamp": 1676901762,
//   "creator": "did:key:z6MkfGLpuLq7vVXU93xRH1mLghA5FmutCGmUWKZ1VuwT3QJu",
//   "family": "orbis",
//   "hash": null,
//   "weight": 10,
//   "identifier": "orbis-active-wallet-polygon"
// }
