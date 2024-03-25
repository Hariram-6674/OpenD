import type { Principal } from '@dfinity/principal';
export interface NFT {
  'img' : () => Promise<Array<number>>,
  'namer' : () => Promise<string>,
  'retOwn' : () => Promise<Principal>,
  'thisCanisterId' : () => Promise<Principal>,
  'transfer' : (arg_0: Principal) => Promise<string>,
}
export interface _SERVICE extends NFT {}
