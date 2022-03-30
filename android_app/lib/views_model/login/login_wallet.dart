import 'package:ethers/signers/wallet.dart';
import 'package:flutter/foundation.dart';

class LoginWallet with ChangeNotifier, DiagnosticableTreeMixin {
  late Wallet wallet;

  Wallet get loginWallet => wallet;

  void login(Wallet _wallet) {
    wallet = _wallet;
    notifyListeners();
  }
}
