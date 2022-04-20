import 'package:android_app/models/item_detail.dart';
import 'package:android_app/views/payment/bill.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../utils/constants/theme.dart';
import '../../views_model/login/login_wallet.dart';

class PaymentView extends StatelessWidget {
  const PaymentView({Key? key, this.item}) : super(key: key);
  final ItemDetail? item;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Payment',
          overflow: TextOverflow.ellipsis,
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(color: CustomColor.colorLight),
            child: Center(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(CustomSize.sizeXXV),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: CustomSize.sizeXXV,
                        bottom: CustomSize.sizeXXX,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Image(
                            image: AssetImage('assets/brand/brand_V.png'),
                            fit: BoxFit.fitWidth,
                          ),
                        ],
                      ),
                    ),
                    Text(
                      'Confirm your order',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXXV,
                    ),
                    Card(
                      shape: RoundedRectangleBorder(
                        side: BorderSide(color: CustomColor.colorGay, width: 1),
                        borderRadius: BorderRadius.circular(CustomSize.sizeX),
                      ),
                      margin: EdgeInsets.only(bottom: CustomSize.sizeXV),
                      child: Container(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(CustomSize.sizeX),
                                bottomLeft: Radius.circular(CustomSize.sizeX),
                              ),
                              child: Image.network(
                                '${item!.picture}',
                                fit: BoxFit.fitWidth,
                                height: CustomSize.sizeC,
                                width: CustomSize.sizeC,
                              ),
                            ),
                            Flexible(
                              child: Padding(
                                padding: EdgeInsets.only(
                                  top: CustomSize.sizeXV,
                                  bottom: CustomSize.sizeXV,
                                  left: CustomSize.sizeXV,
                                  right: CustomSize.sizeXX,
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      '${item!.name}',
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.left,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: CustomSize.sizeXV,
                                    ),
                                    Text(
                                      '${item!.description}',
                                      maxLines: 3,
                                      textAlign: TextAlign.left,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                          color: CustomColor.colorSecondary),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    ConfirmView(
                      item: item,
                      account: context.read<LoginWallet>().loginAccount,
                      wallet: context.read<LoginWallet>().loginWallet,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
