class Order {
  String? id;
  int? price;
  int? state;
  int? deadline;
  String? seller;
  String? purchaser;
  ItemContract? itemContract;
  String? from;
  String? to;
  String? nowIn;
  String? createdAt;

  Order({
    this.id,
    this.price,
    this.state,
    this.deadline,
    this.seller,
    this.purchaser,
    this.itemContract,
    this.from,
    this.to,
    this.nowIn,
    this.createdAt,
  });

  Order.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    price = json['price'];
    state = json['state'];
    deadline = json['deadline'];
    seller = json['seller'];
    purchaser = json['purchaser'];
    itemContract = json['itemContract'] != null
        ? ItemContract.fromJson(json['itemContract'])
        : null;
    from = json['from'];
    to = json['to'];
    nowIn = json['nowIn'];
    createdAt = json['createdAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['price'] = price;
    data['state'] = state;
    data['deadline'] = deadline;
    data['seller'] = seller;
    data['purchaser'] = purchaser;
    if (itemContract != null) {
      data['itemContract'] = itemContract!.toJson();
    }
    data['from'] = from;
    data['to'] = to;
    data['nowIn'] = nowIn;
    data['createdAt'] = createdAt;
    return data;
  }
}

class ItemContract {
  String? id;
  String? name;
  int? price;
  String? owner;
  String? picture;

  ItemContract({this.id, this.name, this.price, this.owner, this.picture});

  ItemContract.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    name = json['name'];
    price = json['price'];
    owner = json['owner'];
    picture = json['picture'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['name'] = name;
    data['price'] = price;
    data['owner'] = owner;
    data['picture'] = picture;
    return data;
  }
}
