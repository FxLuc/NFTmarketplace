import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import '../../models/item_post.dart';
import '../../views_model/home/item_list_view_model.dart';

class ItemListView extends StatefulWidget {
  const ItemListView({Key? key}) : super(key: key);

  @override
  _ItemListViewState createState() => _ItemListViewState();
}

class _ItemListViewState extends State<ItemListView> {
  late Future<List<ItemPost>> itemList;

  @override
  initState() {
    super.initState();
    itemList = getItemListNewest();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          FutureBuilder<List<ItemPost>>(
            future: itemList,
            builder:
                (BuildContext context, AsyncSnapshot<List<ItemPost>> snapshot) {
              if (snapshot.hasData) {
                // return Text('${snapshot.data![0].id}');
                return Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(10),
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      return Card(
                          child: Container(
                        color: Colors.white,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Image.network(
                              '${snapshot.data![index].picture}',
                              fit: BoxFit.fitWidth,
                              height: 250,
                              width: 400,
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                '${snapshot.data![index].name}', ///////////// lỗi
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                  fontSize: 19,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 8.0),
                              child: Text(
                                'Owner: ${snapshot.data![index].owner}',
                                style: TextStyle(
                                  color: CustomColor.colorDark,
                                  fontSize: CustomSize.sizeXV,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Padding(
                              padding: EdgeInsets.all(CustomSize.sizeXV),
                              child: Row(
                                children: <Widget>[
                                  Expanded(
                                    flex: 1,
                                    child: RichText(
                                      text: TextSpan(
                                        children: [
                                          WidgetSpan(
                                            child: Icon(
                                              Icons.copy,
                                              size: CustomSize.sizeXX,
                                            ),
                                          ),
                                          TextSpan(
                                            text: "Ox1...BBC",
                                            style: TextStyle(
                                              color: CustomColor.colorDark,
                                              fontSize: CustomSize.sizeXV,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                      flex: 1,
                                      child: RichText(
                                        textAlign: TextAlign.right,
                                        text: TextSpan(
                                          children: [
                                            WidgetSpan(
                                              child: Icon(
                                                Icons.price_change,
                                                size: CustomSize.sizeXX,
                                                color: CustomColor.colorDark,
                                              ),
                                            ),
                                            TextSpan(
                                              text:
                                                  '${snapshot.data![index].price}',
                                              style: TextStyle(
                                                fontSize: CustomSize.sizeXV,
                                                color: CustomColor.colorDark,
                                              ),
                                            ),
                                          ],
                                        ),
                                      )),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ));
                    },
                  ),
                );
              } else {
                return const CircularProgressIndicator();
              }
            },
          ),
        ],
      ),
    );
  }
}
