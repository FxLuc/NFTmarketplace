import 'package:android_app/utils/constants/theme.dart';
import 'package:android_app/views_model/search/search_item_list_view_model.dart';
import 'package:flutter/material.dart';
import 'package:scroll_app_bar/scroll_app_bar.dart';
import '../../models/item_post.dart';
import '../../widgets/circular_progress_indicator.dart';
import '../main_screen.dart';
import '../../widgets/item_card.dart';

class SearchView extends StatefulWidget {
  const SearchView({Key? key}) : super(key: key);
  @override
  State<SearchView> createState() => _SearchViewState();
}

class _SearchViewState extends State<SearchView> {
  late Future<List<ItemPost>> itemList;
  final controller = ScrollController();
  final _searchController = TextEditingController();
  String? searchValue;

  void onSearchHandler(String value) {
    setState(() {
      searchValue = value;
      itemList = searchItemList(value);
    });
  }

  @override
  initState() {
    super.initState();
    final MainScreenState? mainScreenState =
        context.findAncestorStateOfType<MainScreenState>();
    final _searchValueFromHome = mainScreenState!.searchValue;
    onSearchHandler(_searchValueFromHome ?? "");
    _searchController.text = _searchValueFromHome ?? "";
    searchValue = _searchValueFromHome ?? "";
    itemList = searchItemList(_searchController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: searchBar(),
      body: Snap(
        controller: controller.appBar,
        child: Container(
          color: CustomColor.colorGay,
          child: Column(
            children: [
              FutureBuilder<List<ItemPost>>(
                future: itemList,
                builder: (BuildContext context,
                    AsyncSnapshot<List<ItemPost>> snapshot) {
                  if (searchValue!.isEmpty || snapshot.hasError) {
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
                                'NO ITEMS FOUND',
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
                    // return Text('${snapshot.data![0].id}');
                    return Expanded(
                      child: ListView.builder(
                        controller: controller,
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
      ),
    );
  }

  ScrollAppBar searchBar() {
    return ScrollAppBar(
      controller: controller,
      automaticallyImplyLeading: false,
      titleSpacing: 4,
      backgroundColor: Colors.white,
      title: Padding(
        padding: EdgeInsets.all(CustomSize.sizeV),
        child: TextField(
          onSubmitted: (value) {
            value.isNotEmpty
                ? {
                    onSearchHandler(value),
                  }
                : {};
          },
          style: TextStyle(
            color: CustomColor.colorDark,
          ),
          decoration: InputDecoration(
            hintText: 'Dell Precision',
            labelText: 'Find index, name, and address',
            prefixIcon: Icon(
              Icons.search,
              color: CustomColor.colorDark,
              size: CustomSize.sizeXXV,
            ),
            // suffixIcon: IconButton(
            //   icon: const Icon(Icons.mic),
            //   color: CustomColor.colorSecondary,
            //   onPressed: () {
            //     ScaffoldMessenger.of(context).showSnackBar(
            //       snackBarControl(
            //         'Cannot access to your microphone.',
            //         'OK',
            //       ),
            //     );
            //   },
            //   tooltip: "Voice search",
            // ),
            filled: true,
            fillColor: Colors.white,
            floatingLabelBehavior: FloatingLabelBehavior.never,
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(
                color: CustomColor.colorLight,
                width: 0.0,
              ),
            ),
            focusedBorder: const OutlineInputBorder(
              borderSide: BorderSide(
                color: Colors.white,
                width: 0.0,
              ),
            ),
            contentPadding: const EdgeInsets.symmetric(
              vertical: 0.0,
            ),
          ),
        ),
      ),
    );
  }
}
