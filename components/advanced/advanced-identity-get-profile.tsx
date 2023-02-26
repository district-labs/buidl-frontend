import { OrbisGetProfile } from '../identity/orbis-get-profile';

export default function AdvancedIdentityGetProfile() {
  return (
    <div className="card">
      <div>
        <h3 className="text-center text-3xl font-semibold">Get Profile</h3>
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-center">
        <OrbisGetProfile className="card w-full" />
      </div>
    </div>
  );
}
