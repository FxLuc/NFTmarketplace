import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/order.dart';
import '../../views_model/login/login_wallet.dart';
import '../../views_model/my_order/my_order_view_model.dart';
import '../../widgets/circular_progress_indicator.dart';
import 'order_card.dart';

class MyOrderView extends StatefulWidget {
  const MyOrderView({Key? key}) : super(key: key);
  @override
  State<MyOrderView> createState() => _MyOrderViewState();
}

class _MyOrderViewState extends State<MyOrderView> {
  late Future<List<Order>> orderList;

  @override
  Widget build(BuildContext context) {
    () async {
      Future<List<Order>> myOrderList;
      try {
        myOrderList =
            getMyOrderList(context.watch<LoginWallet>().loginAccount.id);
        orderList = myOrderList;
      } catch (err) {
        throw Exception(err);
      }
    }();
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My order purchase',
          overflow: TextOverflow.ellipsis,
          textAlign: TextAlign.center,
        ),
        centerTitle: true,
      ),
      body: Container(
        color: CustomColor.colorGay,
        child: Column(
          children: [
            FutureBuilder<List<Order>>(
              future: orderList,
              builder:
                  (BuildContext context, AsyncSnapshot<List<Order>> snapshot) {
                if (snapshot.hasError) {
                  return Center(
                    child: SingleChildScrollView(
                      padding: EdgeInsets.only(
                        left: CustomSize.sizeX,
                        right: CustomSize.sizeX,
                        top: CustomSize.sizeX,
                        bottom: CustomSize.sizeL,
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.max,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Padding(
                            padding: EdgeInsets.only(
                              top: CustomSize.sizeC,
                              bottom: CustomSize.sizeXV,
                            ),
                            child: Text(
                              'NO ORDER FOUND',
                              style: TextStyle(
                                fontSize: CustomSize.sizeXXX,
                                color: CustomColor.colorSecondary,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                } else if (snapshot.hasData) {
                  return Expanded(
                    child: ListView.builder(
                      padding: EdgeInsets.all(CustomSize.sizeX),
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return orderCard(context, index, snapshot);
                      },
                    ),
                  );
                } else {
                  return loadingCircular();
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
