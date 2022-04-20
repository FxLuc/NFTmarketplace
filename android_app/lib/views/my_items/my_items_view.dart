import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/item_post.dart';
import '../../views_model/login/login_wallet.dart';
import '../../views_model/my_items/my_items_view_model.dart';
import '../../widgets/circular_progress_indicator.dart';
import '../../widgets/item_card.dart';

class MyItemsView extends StatefulWidget {
  const MyItemsView({Key? key}) : super(key: key);
  @override
  State<MyItemsView> createState() => _MyItemsViewState();
}

class _MyItemsViewState extends State<MyItemsView> {
  late Future<List<ItemPost>> itemList;

  @override
  Widget build(BuildContext context) {
    () async {
      Future<List<ItemPost>> myItemList;
      try {
        myItemList =
            getMyItemList(context.watch<LoginWallet>().loginAccount.id);
        itemList = myItemList;
      } catch (err) {
        throw Exception(err);
      }
    }();
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My items',
          overflow: TextOverflow.ellipsis,
          textAlign: TextAlign.center,
        ),
        centerTitle: true,
      ),
      body: Container(
        color: CustomColor.colorGay,
        child: Column(
          children: [
            FutureBuilder<List<ItemPost>>(
              future: itemList,
              builder: (BuildContext context,
                  AsyncSnapshot<List<ItemPost>> snapshot) {
                if (snapshot.hasData) {
                  // return Text('${snapshot.data![0].id}');
                  return Expanded(
                    child: ListView.builder(
                      padding: EdgeInsets.all(CustomSize.sizeX),
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return itemCard(context, index, snapshot);
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
