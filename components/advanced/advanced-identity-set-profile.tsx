import { OrbisFormSetProfile } from '../identity/orbis-form-set-profile';
import { OrbisGetProfile } from '../identity/orbis-get-profile';

export default function AdvancedIdentitySetProfile() {
  return (
    <div className="card">
      <div>
        <h3 className="text-center text-3xl font-semibold">Update Profile</h3>
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-center">
        <OrbisFormSetProfile className="w-full" />
      </div>
    </div>
  );
}
