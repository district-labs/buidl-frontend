import OrbisConnect from '../identity/orbis-connect';

export default function AdvanedOrbisConnect() {
  return (
    <div className="card">
      <div className="flex items-center justify-center text-center">
        <OrbisConnect className="btn btn-normal" label="Identity Connect" />
      </div>
      <div>
        <hr className="my-4" />
        <h3 className="text-center">Start a Decentralized Identity</h3>
      </div>
    </div>
  );
}
