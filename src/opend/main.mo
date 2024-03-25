import Text "mo:base/Text";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
actor OpenD {

    private type Listing = {
        itemOwner : Principal;
        itemPrice : Nat;
    };

    var mapOfNFT = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mpOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var mpOfListing = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    public shared (msg) func mint(imagDat : [Nat8], name : Text) : async Principal {
        let owner : Principal = msg.caller;
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imagDat);
        let newNftprincipal = await newNFT.thisCanisterId();

        mapOfNFT.put(newNftprincipal, newNFT);
        addToOwner(owner, newNftprincipal);

        return newNftprincipal;
    };

    private func addToOwner(owner : Principal, nftID : Principal) {
        var ownedNFT : List.List<Principal> = switch (mpOfOwners.get(owner)) {
            case (null) { List.nil<Principal>() };
            case (?result) { result };
        };

        ownedNFT := List.push(nftID, ownedNFT);
        mpOfOwners.put(owner, ownedNFT);
    };

    public query func seeOwnedNFT(owner : Principal) : async [Principal] {
        var OwnedNFTs : List.List<Principal> = switch (mpOfOwners.get(owner)) {
            case (null) { List.nil<Principal>() };
            case (?result) { result };
        };
        return List.toArray(OwnedNFTs);
    };

    public query func getListedNFTS() : async [Principal] {
        let listtt = Iter.toArray(mpOfListing.keys());
        return listtt;
    };

    public shared (msg) func listItem(id : Principal, price : Nat) : async Text {
        var items : NFTActorClass.NFT = switch (mapOfNFT.get(id)) {
            case (null) { return "Does not exist!!!" };
            case (?result) { result };
        };

        let ownerr = await items.retOwn();
        if (Principal.equal(ownerr, msg.caller)) {
            let newListing : Listing = {
                itemOwner = ownerr;
                itemPrice = price;
            };
            mpOfListing.put(id, newListing);
            return "Success";
        } else {
            return "You don't own the NFT";
        };
    };

    public query func OpenDCanisterID() : async Principal {
        return Principal.fromActor(OpenD);
    };
    public query func isListed(id : Principal) : async Bool {
        if (mpOfListing.get(id) == null) {
            return false;
        } else {
            return true;
        };
    };

    public query func OriginalOwner(id : Principal) : async Principal {
        var listing : Listing = switch (mpOfListing.get(id)) {
            case null return Principal.fromText("");
            case (?result) result;
        };
        return listing.itemOwner;
    };

    public query func NFTprice(id : Principal) : async Nat {
        var listing : Listing = switch (mpOfListing.get(id)) {
            case null return 0;
            case (?result) result;
        };
        return listing.itemPrice;
    };

    public shared (msg) func completePurchase(id : Principal, owner : Principal, newOwner : Principal) : async Text {
        var purchaseNFT : NFTActorClass.NFT = switch (mapOfNFT.get(id)) {
            case null return "NFT does not exist";
            case (?result) result;
        };
        let transferResult = await purchaseNFT.transfer(newOwner);
        if (transferResult == "Success") {
            mpOfListing.delete(id);
            var owndNFT : List.List<Principal> = switch (mpOfOwners.get(owner)) {
                case null List.nil<Principal>();
                case (?result) result;
            };
            owndNFT := List.filter(
                owndNFT,
                func(listItemid : Principal) : Bool {
                    return listItemid != id;
                },
            );
            addToOwner(newOwner, id);
            return "Success";
        } else {
            return "Error";
        };
    };
};
