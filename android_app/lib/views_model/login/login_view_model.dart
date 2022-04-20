import 'dart:convert';

import 'package:android_app/models/account.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../utils/constants/url.dart';
import '../../views/main_screen.dart';
import '../../widgets/snack_bar.dart';
import 'package:ethers/signers/wallet.dart';
import 'login_wallet.dart';
import 'package:http/http.dart' as http;
// import 'package:ethers/ethers.dart';
// import 'package:android_app/utils/constants/url.dart';

void login(BuildContext context, String loginInput, bool isPrivateKey) async {
  try {
    final Wallet wallet;
    if (isPrivateKey) {
      wallet = Wallet.fromPrivateKey(loginInput);
    } else {
      wallet = Wallet.fromMnemonic(loginInput);
    }
    // final testnetProvider =
    //     ethers.providers.jsonRpcProvider(url: ApiEnpoint.httpProvider);
    // final mnemonic = wallet.mnemonic?.phrase;
    // final privateKey = wallet.privateKey;
    // print(privateKey);
    // final balance = await testnetProvider
    //     .getBalance("0xbaBD46b079B233255784c6dFA8a86E03422512Ce");
    // print(await ethers.utils.formatEther(balance));

    // final walletWithProvider = wallet.connect(testnetProvider);
    // final block = await testnetProvider.getBlockNumber();
    final response = await http.post(
      Uri.parse(ApiEnpoint.getAccount),
      body: {'_id': wallet.address},
    );
    final accountModel = AccountModel.fromJson(json.decode(response.body));
    context.read<LoginWallet>().login(wallet, accountModel);
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'Login success!',
        'OK',
      ),
    );
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const MainScreen()),
    );
  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'Login failed, please check your connection',
        'OK',
      ),
    );
  }
}
