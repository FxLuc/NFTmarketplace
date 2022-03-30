import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../views_model/login/login_wallet.dart';
import 'item_list_view.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          // 'FINDEX',
          '${context.watch<LoginWallet>().loginWallet.address}',
        ),
      ),
      body: Container(
        child: const ItemListView(),
      ),
      // endDrawer: Drawer(
      //   child: SingleChildScrollView(
      //     child: Container(
      //       child: Column(
      //         children: const [
      //           HeaderDrawer(),
      //         ],
      //       ),
      //     ),
      //   ),
      // ),
    );
  }
}
