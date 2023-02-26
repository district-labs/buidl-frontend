import { useEffect, useState } from 'react';

import classNames from 'clsx';
import { useForm } from 'react-hook-form';
import { useSigner } from 'wagmi';

import { orbis } from '@/lib/orbis';
import { useDID } from '@/lib/state-did';

interface OrbisFormSetProfileProps {
  className?: string;
}

export const OrbisFormSetProfile = ({
  className,
}: OrbisFormSetProfileProps) => {
  const classes = classNames(className, 'OrbisFormSetProfile');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useSigner();
  const [did, setDid] = useDID();
  const [profile, setProfile] = useState();

  const [isConnected, setIsConnected] = useState<boolean>();
  useEffect(() => {
    (async () => {
      let res = await orbis.isConnected();
      if (res.status == 200) {
        setDid(res.did);
        setIsConnected(true);
      } else {
        console.log('Error connecting to Ceramic: ', res);
        alert('Error connecting to Ceramic.');
      }
    })();
  }, []);

  async function connect() {
    let res = await orbis.connect(data?.provider?.provider, false);
    if (res.status == 200) {
      setDid(res.did);
      setIsConnected(true);
    } else {
      console.log('Error connecting to Ceramic: ', res);
      alert('Error connecting to Ceramic.');
    }
  }

  useEffect(() => {
    (async () => {
      let { data, error } = await orbis.getProfile(did);
      if (error) {
        return;
      }
      setProfile(data);
    })();
  }, [did]);

  useEffect(() => {
    setValue('username', profile?.username);
    setValue('description', profile?.details?.profile?.description);
    setValue('pfp', profile?.details?.profile?.pfp);
    setValue('cover', profile?.details?.profile?.cover);
  }, [profile]);

  const onSubmit = async (formData: any) => {
    Object.keys(formData).forEach((key) =>
      formData[key] === undefined ? delete formData[key] : formData[key]
    );
    let { error } = await orbis.updateProfile(formData);
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('username')} className="input" />
        <label>Description</label>
        <textarea {...register('description')} className="input" />
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12 lg:col-span-6">
            <label>Avatar</label>
            <input {...register('pfp')} className="input" />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <label>Cover</label>
            <input {...register('cover')} className="input" />
          </div>
        </div>
        {isConnected ? (
          <input type="submit" className="btn-normal" />
        ) : (
          <button className="btn-primary" onClick={() => connect()}>
            Connect
          </button>
        )}
      </form>
    </div>
  );
};
