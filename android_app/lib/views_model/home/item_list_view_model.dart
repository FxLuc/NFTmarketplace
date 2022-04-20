import 'dart:convert';
import 'package:android_app/utils/constants/url.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../../models/item_post.dart';

Future<List<ItemPost>> getItemListNewest() async {
  try {
    final response = await http.get(Uri.parse(ApiEnpoint.itemNewest));
    return compute(parseJson, response.body);
  } catch (e) {
    throw Exception(e);
  }
}

List<ItemPost> parseJson(String responseBody) {
  var itemList = json.decode(responseBody) as List<dynamic>;
  return itemList.map((item) => ItemPost.fromJson(item)).toList();
}