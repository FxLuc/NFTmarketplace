import 'package:android_app/views/account/account_view.dart';
import 'package:android_app/views/my_items/my_items_view.dart';
import 'package:android_app/views/my_order/my_order.dart';
import 'package:flutter/material.dart';
import '../utils/constants/theme.dart';
import 'home/home_view.dart';
import 'search/search_view.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => MainScreenState();
}

class MainScreenState extends State<MainScreen> {
  int selectedIndex = 0;
  String? searchValue;

  void onSearchHandler(String value) {
    setState(() {
      searchValue = value;
    });
  }

  void onTapHandler(int index) {
    index == 0 ? onSearchHandler("") : null;
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      //Prevent back button
      onWillPop: () {
        return Future(() => false);
      },
      child: Scaffold(
        body: views.elementAt(selectedIndex),
        bottomNavigationBar: appBarBottom(),
      ),
    );
  }

  List<Widget> views = <Widget>[
    const HomeView(),
    const SearchView(),
    const MyOrderView(),
    const MyItemsView(),
    const AccountView(),
  ];

  Container appBarBottom() {
    return Container(
      decoration: BoxDecoration(
        boxShadow: <BoxShadow>[
          BoxShadow(
              color: CustomColor.colorSecondary,
              blurRadius: CustomSize.sizeXV,
              offset: const Offset(0.0, 5))
        ],
      ),
      child: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: CustomColor.colorDark,
        backgroundColor: CustomColor.colorLight,
        // fixedColor: CustomColor.colorDark,
        // unselectedItemColor: colorControlPrimaryLight,
        selectedFontSize: CustomSize.sizeX,
        unselectedFontSize: CustomSize.sizeX,
        currentIndex: selectedIndex,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.pending_actions_sharp),
            label: 'Order',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.portrait),
            label: 'Items',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Account',
          ),
        ],
        onTap: (int index) {
          onTapHandler(index);
        },
      ),
    );
  }
}
