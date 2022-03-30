class WalletModel {
  String? address;
  String? mnemonic;
  String? privateKey;

  WalletModel({this.address, this.mnemonic, this.privateKey});

  WalletModel.fromJson(Map<String, dynamic> json) {
    address = json['address'];
    mnemonic = json['mnemonic'];
    privateKey = json['privateKey'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['address'] = address;
    data['mnemonic'] = mnemonic;
    data['privateKey'] = privateKey;
    return data;
  }
}

class AccountModel {
  String? id;
  String? name;
  String? avatar;

  AccountModel({this.id, this.name, this.avatar});

  AccountModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    name = json['name'];
    avatar = json['avatar'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['name'] = name;
    data['avatar'] = avatar;
    return data;
  }
}