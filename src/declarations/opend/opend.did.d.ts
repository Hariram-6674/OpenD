import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'NFTprice' : (arg_0: Principal) => Promise<bigint>,
  'OpenDCanisterID' : () => Promise<Principal>,
  'OriginalOwner' : (arg_0: Principal) => Promise<Principal>,
  'completePurchase' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: Principal,
    ) => Promise<string>,
  'getListedNFTS' : () => Promise<Array<Principal>>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'listItem' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'mint' : (arg_0: Array<number>, arg_1: string) => Promise<Principal>,
  'seeOwnedNFT' : (arg_0: Principal) => Promise<Array<Principal>>,
}
