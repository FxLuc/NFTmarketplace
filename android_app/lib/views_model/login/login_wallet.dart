import 'package:android_app/models/account.dart';
import 'package:ethers/ethers.dart';
import 'package:ethers/providers/json_rpc_provider.dart';
import 'package:ethers/signers/wallet.dart';
import 'package:flutter/foundation.dart';
import '../../utils/constants/url.dart';

class LoginWallet with ChangeNotifier, DiagnosticableTreeMixin {
  late Wallet wallet;
  late AccountModel account;
  final provider =
      ethers.providers.jsonRpcProvider(url: ApiEnpoint.httpProvider);

  Wallet get loginWallet => wallet;
  AccountModel get loginAccount => account;
  JsonRpcProvider get ethProvider => provider;

  void login(Wallet _wallet, AccountModel _account) {
    wallet = _wallet;
    account = _account;
    notifyListeners();
  }
}
