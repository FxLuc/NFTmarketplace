import 'package:android_app/utils/constants/url.dart';
import 'package:flutter/material.dart';
import '../../widgets/snack_bar.dart';
import 'package:http/http.dart' as http;

sendTransaction(BuildContext context, privateKey, amount, to) async {
  try {
    final response = await http.post(
      Uri.parse(ApiEnpoint.transaction),
      body: {
        'privateKey': privateKey.toString(),
        'amount': amount.toString(),
        'to': to.toString(),
      },
    );
    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'Successfully confirm transsaction!',
          'OK',
        ),
      );
      return response.body;
      // Navigator.push(
      //   context,
      //   MaterialPageRoute(
      //       builder: (context) =>
      //           RegisterViewNext(secretRecoveyPhrase: accountModel.mnemonic)),
      // );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'Fail to send transacton.',
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
