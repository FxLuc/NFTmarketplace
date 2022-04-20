import 'package:android_app/models/account.dart';
import 'package:android_app/models/item_detail.dart';
import 'package:ethers/signers/wallet.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../utils/constants/theme.dart';
import '../../utils/ethereum.dart';
import '../../views_model/payment/payment_view_model.dart';
import '../../widgets/circular_progress_indicator.dart';

class ConfirmView extends StatefulWidget {
  const ConfirmView({Key? key, this.item, this.account, this.wallet})
      : super(key: key);

  final ItemDetail? item;
  final AccountModel? account;
  final Wallet? wallet;

  @override
  _ConfirmViewState createState() => _ConfirmViewState();
}

class _ConfirmViewState extends State<ConfirmView> {
  ItemDetail? item;
  AccountModel? account;
  Wallet? wallet;
  bool isConfirming = false;

  confirming() {
    setState(() {
      isConfirming = true;
    });
  }

  confirmDone() {
    setState(() {
      isConfirming = false;
    });
  }

  @override
  void initState() {
    super.initState();
    item = widget.item!;
    account = widget.account!;
    wallet = widget.wallet!;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Card(
          shape: RoundedRectangleBorder(
            side: BorderSide(color: CustomColor.colorGay, width: 1),
            borderRadius: BorderRadius.circular(CustomSize.sizeX),
          ),
          margin: EdgeInsets.only(bottom: CustomSize.sizeXV),
          child: Container(
            padding: EdgeInsets.only(
              top: CustomSize.sizeXV,
              bottom: CustomSize.sizeXV,
              left: CustomSize.sizeXV,
              right: CustomSize.sizeXV,
            ),
            width: double.infinity,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Transaction Details',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  height: CustomSize.sizeXV,
                ),
                Text(
                  'From: ${subAddress(account!.id, 10)}',
                  maxLines: 3,
                  textAlign: TextAlign.left,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: CustomColor.colorSecondary),
                ),
                SizedBox(
                  height: CustomSize.sizeV,
                ),
                Text(
                  'To: ${subAddress(item!.id, 10)}',
                  maxLines: 3,
                  textAlign: TextAlign.left,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: CustomColor.colorSecondary),
                ),
                SizedBox(
                  height: CustomSize.sizeV,
                ),
                Text(
                  'Amount: ${item!.price} (${covertToEther(BigInt.from(item!.price))} ETH)',
                  maxLines: 3,
                  textAlign: TextAlign.left,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: CustomColor.colorSecondary),
                ),
              ],
            ),
          ),
        ),
        (() {
          // your code here
          return isConfirming
              ? loadingCircularSmall()
              : ElevatedButton(
                  onPressed: () async {
                    confirming();
                    final String transactionTX = await sendTransaction(
                      context,
                      wallet!.privateKey,
                      item!.price,
                      item!.id,
                      // "0xcD8D1ab6b7e306a74B48779D10c99908F627905E",
                    );
                    final _transactionTX =
                        transactionTX.substring(1, transactionTX.length - 1);
                    final _url =
                        'https://goerli.etherscan.io/tx/$_transactionTX';
                    launch(_url);

                    // Navigator.push(
                    //   context,
                    //   MaterialPageRoute(
                    //       builder: (context) => RegisterViewFinal(secretRecoveyPhrase: widget.secretRecoveyPhrase)),
                    // );
                  },
                  style: TextButton.styleFrom(
                      backgroundColor: CustomColor.colorPrimary,
                      padding: EdgeInsets.symmetric(
                        vertical: CustomSize.sizeX,
                        horizontal: CustomSize.sizeXX,
                      ),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                  child: Text(
                    'Confirm',
                    style: TextStyle(
                      color: CustomColor.colorLight,
                      fontSize: CustomSize.sizeXVII,
                    ),
                  ),
                );
        }())
      ],
    );
  }
}
