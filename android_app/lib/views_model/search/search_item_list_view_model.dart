import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../../models/item_post.dart';

Future<List<ItemPost>> searchItemList(keywords) async {
  try {
    final response = await http.get(
      Uri.http(
        "103.170.246.112:50667",
        '/item/search',
        {"keywords": keywords},
      ),
    );
    // final response = await http.get(Uri.parse(ApiEnpoint.itemNewest));
    return compute(parseJson, response.body);
  } catch (error) {
    throw Exception(error);
  }
}

List<ItemPost> parseJson(String responseBody) {
  var itemList = json.decode(responseBody) as List<dynamic>;
  return itemList.map((item) => ItemPost.fromJson(item)).toList();
}