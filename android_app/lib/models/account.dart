class AccountModel {
  String? address;
  String? mnemonic;
  String? privateKey;

  AccountModel({this.address, this.mnemonic, this.privateKey});

  AccountModel.fromJson(Map<String, dynamic> json) {
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