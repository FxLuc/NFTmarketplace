import 'package:android_app/utils/constants/url.dart';
import 'package:android_app/views/register/register_view_next.dart';
import 'package:flutter/material.dart';
import '../../widgets/snack_bar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

register(BuildContext context) async {
  try {
    final response = await http.get(Uri.parse(ApiEnpoint.serverEndpoint));
    final secretRecoveyPhrase = json.decode(response.body);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => RegisterViewNext(secretRecoveyPhrase: secretRecoveyPhrase)),
    );
  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'No internet, please check your connection',
        'OK',
      ),
    );
  }
}
