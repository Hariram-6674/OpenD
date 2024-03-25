export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'img' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'namer' : IDL.Func([], [IDL.Text], ['query']),
    'retOwn' : IDL.Func([], [IDL.Principal], ['query']),
    'thisCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'transfer' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Vec(IDL.Nat8)];
};
