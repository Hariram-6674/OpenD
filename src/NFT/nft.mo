import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
actor class NFT(name : Text, owner : Principal, image : [Nat8]) = this {
    // Debug.print("Hello");
    private let Name = name;
    private var Owner = owner;
    private let Image = image;

    public query func namer() : async Text {
        return Name;
    };
    public query func retOwn() : async Principal {
        return Owner;
    };
    public query func img() : async [Nat8] {
        return Image;
    };
    public query func thisCanisterId() : async Principal {
        return Principal.fromActor(this);
    };
    public shared (msg) func transfer(newOwner : Principal) : async Text {
        if (msg.caller == Owner) {
            Owner := newOwner;
            return "Success";
        } else {
            return "Error: Not initiated by same owner";
        };
    };
};
