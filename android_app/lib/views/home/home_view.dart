import 'package:ethers/signers/wallet.dart';
import 'package:flutter/material.dart';

import '../../widgets/header_drawer.dart';
import 'item_list_view.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key, required Wallet wallet}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'FINDEX',
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
