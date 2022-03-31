class ItemDetail {
  dynamic id;
  dynamic name;
  dynamic price;
  dynamic owner;
  dynamic order;
  dynamic description;
  dynamic specifications;
  dynamic externalLink;
  dynamic rawDataHash;
  dynamic state;
  dynamic createdAt;
  dynamic picture;

  ItemDetail({
    this.id,
    this.name,
    this.price,
    this.owner,
    this.picture,
    this.createdAt,
    this.description,
    this.externalLink,
    this.order,
    this.rawDataHash,
    this.specifications,
    this.state,
  });

  ItemDetail.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    name = json['name'];
    price = json['price'];
    owner = json['owner'];
    picture = json['picture'];
    createdAt = json['createdAt'];
    description = json['description'];
    externalLink = json['externalLink'];
    order = json['order'];
    rawDataHash = json['rawDataHash'];
    specifications = json['specifications'];
    state = json['state'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['name'] = name;
    data['price'] = price;
    data['owner'] = owner;
    data['picture'] = picture;
    data['createdAt'] = createdAt;
    data['description'] = description;
    data['externalLink'] = externalLink;
    data['order'] = order;
    data['rawDataHash'] = rawDataHash;
    data['specifications'] = specifications;
    data['state'] = state;
    return data;
  }
}
