import { useEffect, useState } from 'react';

import classNames from 'clsx';

import { orbis } from '@/lib/orbis';
import { useDID } from '@/lib/state-did';

interface OrbisProfileProps {
  className?: string;
}

export const OrbisGetProfile = ({ className }: OrbisProfileProps) => {
  const [profile, setProfile] = useState();
  const [did] = useDID();
  useEffect(() => {
    (async () => {
      let { data, error } = await orbis.getProfile(did);
      if (error) {
        console.log(error);
      }
      setProfile(data);
    })();
  }, [did]);

  const classes = classNames(className, 'OrbisProfile');
  return (
    <div className={classes}>
      {!profile?.details?.profile?.cover ? (
        <img
          alt="profile"
          className="rounded-md border-2 object-cover shadow-sm"
          src="https://via.placeholder.com/640x220"
        />
      ) : (
        <div className="mb-4">
          <img
            alt="profile"
            className="rounded-md border-2 object-cover shadow-sm"
            src={profile?.details?.profile.cover}
          />
        </div>
      )}
      <div className="mt-5 flex items-center gap-5">
        {!profile?.details?.profile?.pfp ? (
          <img
            alt="profile"
            className="h-20 w-20 rounded-full border-2 shadow-md"
            src="https://via.placeholder.com/100x100"
          />
        ) : (
          <img
            alt="profile"
            className="h-20 w-20 rounded-full border-2 shadow-md"
            src={profile?.details?.profile?.pfp}
          />
        )}
        <div className="text-left">
          {!profile?.username ? (
            <h3 className="text-xs font-medium">{profile?.did}</h3>
          ) : (
            <h3 className="text-2xl font-bold">{profile?.username}</h3>
          )}
          {!profile?.details.metadata?.ensName ? null : (
            <div className="text-xs text-gray-500">
              {profile?.details.metadata?.ensName}
            </div>
          )}
        </div>
      </div>
      <hr className="my-5" />
      {!profile?.details?.profile?.description ? (
        <p className="">A story to be told...</p>
      ) : (
        <p className="text-lg font-normal">
          {profile?.details?.profile?.description}
        </p>
      )}
      <hr className="my-5" />
      <div className="mt-5 grid grid-cols-12 text-left">
        <div className="col-span-6">
          <h3 className="text-lg font-normal">{profile?.count_following}</h3>
          <p className="text-gray-500">Following</p>
        </div>
        <div className="col-span-6">
          <h3 className="text-lg font-normal">{profile?.count_followers}</h3>
          <p className="text-gray-500">Followers</p>
        </div>
      </div>
      <hr className="my-5" />
      <a
        target={'_blank'}
        className="btn btn-primary mt-4 inline-block w-full"
        href={`https://cerscan.com/mainnet/profile/${profile?.did}`}
        rel="noreferrer"
      >
        View Cerscan Profile
      </a>
    </div>
  );
};
