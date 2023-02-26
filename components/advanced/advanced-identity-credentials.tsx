import OrbisGetCredentials from '../identity/orbis-get-credentials';

export default function AdvancedIdentityCredentials() {
  return (
    <div className="card">
      <div>
        <h3 className="text-center text-3xl font-semibold">
          Verifiable Credentials
        </h3>
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-center text-center">
        <OrbisGetCredentials className="btn btn-normal" />
      </div>
    </div>
  );
}
