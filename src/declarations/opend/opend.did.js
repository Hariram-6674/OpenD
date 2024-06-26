export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'NFTprice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'OpenDCanisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'OriginalOwner' : IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
    'completePurchase' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [IDL.Text],
        [],
      ),
    'getListedNFTS' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'listItem' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'mint' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [IDL.Principal], []),
    'seeOwnedNFT' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
