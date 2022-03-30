import 'package:flutter/material.dart';
import '../utils/constants/theme.dart';
import 'home/home_view.dart';
import 'login/login_view.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int selectedIndex = 0;
  String? searchValue;

  void onSearchHandler(String value) {
    setState(() {
      searchValue = value;
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
    const LoginView(),
    const LoginView(),
    const LoginView(),
    const LoginView(),
  ];

  BottomNavigationBar appBarBottom() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      selectedItemColor: CustomColor.colorDark,
      backgroundColor: CustomColor.colorLight,
      // unselectedItemColor: colorControlPrimaryLight,
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
          icon: Icon(Icons.notifications),
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
    );
  }

  void onTapHandler(int index) {
    index == 0 ? onSearchHandler("") : null;
    setState(() {
      selectedIndex = index;
    });
  }
}
