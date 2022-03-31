import 'dart:convert';
import 'package:android_app/models/order.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

Future<List<Order>> getMyOrderList(address) async {
  try {
    final response = await http.get(
      Uri.http(
        "103.170.246.112:50667",
        '/order/purchase',
        {"_id": address},
      ),
    );
    // final response = await http.get(Uri.parse(ApiEnpoint.itemNewest));
    return compute(parseJson, response.body);
  } catch (error) {
    throw Exception(error);
  }
}

List<Order> parseJson(String responseBody) {
  var itemList = json.decode(responseBody) as List<dynamic>;
  return itemList.map((item) => Order.fromJson(item)).toList();
}