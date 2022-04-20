import 'dart:convert';
import 'package:android_app/models/account.dart';
import 'package:android_app/utils/constants/url.dart';
import 'package:android_app/views/register/register_view_next.dart';
import 'package:flutter/material.dart';
import '../../widgets/snack_bar.dart';
import 'package:http/http.dart' as http;

register(BuildContext context) async {
  try {
    final response = await http.get(Uri.parse(ApiEnpoint.createAccount));
    if (response.statusCode == 201) {
      final accountModel = WalletModel.fromJson(json.decode(response.body));
      // print(accountModel.address);
      // print(accountModel.mnemonic);
      // print(accountModel.privateKey);
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'Successfully created a new account!',
          'OK',
        ),
      );
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) =>
                RegisterViewNext(secretRecoveyPhrase: accountModel.mnemonic)),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'Fail to create new account.',
          'OK',
        ),
      );
    }
  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'No internet, please check your connection.',
        'OK',
      ),
    );
  }
}
