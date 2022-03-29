import 'package:android_app/utils/constants/url.dart';
import 'package:flutter/material.dart';
import '../../widgets/snack_bar.dart';
import 'package:ethers/signers/wallet.dart';
import 'package:ethers/ethers.dart';

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
    // final address = wallet.mnemonic?.phrase;
    // final privateKey = wallet.privateKey;
    // print(privateKey);
    // final balance = await testnetProvider
    //     .getBalance("0xbaBD46b079B233255784c6dFA8a86E03422512Ce");
    // print(await ethers.utils.formatEther(balance));

    // final walletWithProvider = wallet.connect(testnetProvider);
    // final block = await testnetProvider.getBlockNumber();

    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'Login success!',
        'OK',
      ),
    );
    
    // Navigator.pushReplacementNamed(context, HomeScreen.routeName);
  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'No internet, please check your connection',
        'OK',
      ),
    );
  }
}
