class ItemPost {
  String? id;
  String? name;
  dynamic price;
  String? owner;
  String? picture;

  ItemPost({this.id, this.name, this.price, this.owner, this.picture});

  ItemPost.fromJson(Map<String, dynamic> json) {
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
