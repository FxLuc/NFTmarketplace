import 'dart:convert';
import 'package:android_app/models/item_detail.dart';
import 'package:http/http.dart' as http;
import '../../models/item_post.dart';

Future<ItemDetail> getItemDetail(address) async {
  try {
    final response = await http.get(
      Uri.http(
        "103.170.246.112:50667",
        '/item',
        {"_id": address},
      ),
    );
    final itemDetail = ItemDetail.fromJson(json.decode(response.body));
    // final response = await http.get(Uri.parse(ApiEnpoint.itemNewest));
    return itemDetail;
  } catch (error) {
    throw Exception(error);
  }
}

List<ItemDetail> parseJson(String responseBody) {
  var itemList = json.decode(responseBody);
  return itemList.map((item) => ItemPost.fromJson(item)).toList();
}
