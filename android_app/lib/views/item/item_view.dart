import 'package:android_app/utils/constants/theme.dart';
import 'package:android_app/views/payment/payment.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../models/item_detail.dart';
import '../../utils/clipboard.dart';
import '../../utils/ethereum.dart';
import '../../views_model/item/item_view_model.dart';
import '../../widgets/circular_progress_indicator.dart';

class ItemView extends StatefulWidget {
  const ItemView({Key? key, required this.address}) : super(key: key);
  final String address;

  @override
  State<ItemView> createState() => _ItemViewState();
}

class _ItemViewState extends State<ItemView> {
  late Future<ItemDetail> itemDetail;
  final controller = ScrollController();

  @override
  initState() {
    super.initState();
    itemDetail = getItemDetail(widget.address);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(color: CustomColor.colorLight),
            child: Center(
              child: FutureBuilder<ItemDetail>(
                future: itemDetail,
                builder:
                    (BuildContext context, AsyncSnapshot<ItemDetail> snapshot) {
                  if (snapshot.hasData) {
                    // return Text('${snapshot.data!.id}');
                    return Scaffold(
                      appBar: AppBar(
                        title: Text(
                          '${snapshot.data!.name}',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      body: SingleChildScrollView(
                        // padding: EdgeInsets.all(CustomSize.sizeXXV),
                        child: Column(
                          mainAxisSize: MainAxisSize.max,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Image.network(
                              '${snapshot.data!.picture}',
                              fit: BoxFit.fitWidth,
                              height: CustomSize.sizeCCL,
                              width: CustomSize.sizeCD,
                            ),
                            Card(
                              shape: RoundedRectangleBorder(
                                side: BorderSide(
                                    color: CustomColor.colorGay, width: 2),
                                borderRadius:
                                    BorderRadius.circular(CustomSize.sizeX),
                              ),
                              margin: EdgeInsets.only(
                                top: CustomSize.sizeXV,
                                left: CustomSize.sizeXV,
                                right: CustomSize.sizeXV,
                              ),
                              child: Container(
                                // color: Colors.white,
                                width: double.infinity,
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding:
                                          EdgeInsets.all(CustomSize.sizeXV),
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            '${snapshot.data!.name}',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              color: CustomColor.colorDark,
                                              fontSize: CustomSize.sizeXX,
                                            ),
                                            textAlign: TextAlign.center,
                                          ),
                                          SizedBox(
                                            height: CustomSize.sizeV,
                                          ),
                                        ],
                                      ),
                                    ),
                                    // Text(
                                    //   'Owner by: ${subAddress(snapshot.data!.owner, 3)}',
                                    //   style: TextStyle(
                                    //     color: CustomColor.colorSecondary,
                                    //     // fontWeight: FontWeight.bold,
                                    //     fontSize: CustomSize.sizeXVII,
                                    //   ),
                                    // ),
                                    RichText(
                                      textAlign: TextAlign.right,
                                      text: TextSpan(
                                        children: [
                                          WidgetSpan(
                                            child: FaIcon(
                                              FontAwesomeIcons.ethereum,
                                              color: CustomColor.colorPrimary,
                                              size: CustomSize.sizeXXX,
                                            ),
                                          ),
                                          TextSpan(
                                            text:
                                                ' ${covertToEther(BigInt.from(snapshot.data!.price))} ETH',
                                            style: TextStyle(
                                              fontSize: CustomSize.sizeXXX,
                                              color: CustomColor.colorDark,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    SizedBox(
                                      height: CustomSize.sizeV,
                                    ),
                                    Text(
                                      '(${snapshot.data!.price} wei)',
                                      style: TextStyle(
                                        color: CustomColor.colorSecondary,
                                        fontSize: CustomSize.sizeXV,
                                      ),
                                    ),
                                    SizedBox(
                                      height: CustomSize.sizeXX,
                                    ),
                                    ElevatedButton.icon(
                                      onPressed: () => {
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => PaymentView(
                                              item: snapshot.data!,
                                            ),
                                          ),
                                        )
                                      },
                                      style: TextButton.styleFrom(
                                        backgroundColor:
                                            CustomColor.colorPrimary,
                                        padding: EdgeInsets.symmetric(
                                          vertical: CustomSize.sizeX,
                                          horizontal: CustomSize.sizeXXX,
                                        ),
                                        tapTargetSize:
                                            MaterialTapTargetSize.shrinkWrap,
                                      ),
                                      icon: FaIcon(
                                        FontAwesomeIcons.wallet,
                                        size: CustomSize.sizeXVII,
                                      ),
                                      label: Text(
                                        'Buy now',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: CustomSize.sizeXVII,
                                        ),
                                      ),
                                    ),
                                    SizedBox(
                                      height: CustomSize.sizeXX,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Card(
                              shape: RoundedRectangleBorder(
                                side: BorderSide(
                                    color: CustomColor.colorGay, width: 2),
                                borderRadius:
                                    BorderRadius.circular(CustomSize.sizeX),
                              ),
                              margin: EdgeInsets.only(
                                top: CustomSize.sizeXV,
                                left: CustomSize.sizeXV,
                                right: CustomSize.sizeXV,
                              ),
                              child: Container(
                                // color: Colors.white,
                                width: double.infinity,
                                padding: EdgeInsets.only(
                                  top: CustomSize.sizeXV,
                                  left: CustomSize.sizeXV,
                                  right: CustomSize.sizeXV,
                                ),
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding:
                                          EdgeInsets.all(CustomSize.sizeXV),
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Description',
                                            style: TextStyle(
                                              color: CustomColor.colorDark,
                                              fontWeight: FontWeight.bold,
                                              fontSize: CustomSize.sizeXVII,
                                            ),
                                            textAlign: TextAlign.center,
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      '${snapshot.data!.description}',
                                      style: TextStyle(
                                        color: CustomColor.colorSecondary,
                                        fontSize: CustomSize.sizeXVII,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    // Text(
                                    //   'Owner by: ${subAddress(snapshot.data!.owner, 3)}',
                                    //   style: TextStyle(
                                    //     color: CustomColor.colorSecondary,
                                    //     // fontWeight: FontWeight.bold,
                                    //     fontSize: CustomSize.sizeXVII,
                                    //   ),
                                    // ),

                                    SizedBox(
                                      height: CustomSize.sizeXX,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Card(
                              shape: RoundedRectangleBorder(
                                side: BorderSide(
                                    color: CustomColor.colorGay, width: 2),
                                borderRadius:
                                    BorderRadius.circular(CustomSize.sizeX),
                              ),
                              margin: EdgeInsets.only(
                                top: CustomSize.sizeXV,
                                left: CustomSize.sizeXV,
                                right: CustomSize.sizeXV,
                              ),
                              child: Container(
                                // color: Colors.white,
                                padding: EdgeInsets.only(
                                  top: CustomSize.sizeXV,
                                  left: CustomSize.sizeXV,
                                  right: CustomSize.sizeXV,
                                ),
                                width: double.infinity,
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding:
                                          EdgeInsets.all(CustomSize.sizeXV),
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Specifications',
                                            style: TextStyle(
                                              color: CustomColor.colorDark,
                                              fontWeight: FontWeight.bold,
                                              fontSize: CustomSize.sizeXVII,
                                            ),
                                            textAlign: TextAlign.center,
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      '${snapshot.data!.specifications}',
                                      style: TextStyle(
                                        color: CustomColor.colorSecondary,
                                        fontSize: CustomSize.sizeXVII,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    // Text(
                                    //   'Owner by: ${subAddress(snapshot.data!.owner, 3)}',
                                    //   style: TextStyle(
                                    //     color: CustomColor.colorSecondary,
                                    //     // fontWeight: FontWeight.bold,
                                    //     fontSize: CustomSize.sizeXVII,
                                    //   ),
                                    // ),

                                    SizedBox(
                                      height: CustomSize.sizeXX,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Card(
                              shape: RoundedRectangleBorder(
                                side: BorderSide(
                                    color: CustomColor.colorGay, width: 2),
                                borderRadius:
                                    BorderRadius.circular(CustomSize.sizeX),
                              ),
                              margin: EdgeInsets.only(
                                top: CustomSize.sizeXV,
                                left: CustomSize.sizeXV,
                                right: CustomSize.sizeXV,
                              ),
                              child: Container(
                                // color: Colors.white,
                                width: double.infinity,
                                padding: EdgeInsets.only(
                                  top: CustomSize.sizeXV,
                                  left: CustomSize.sizeXV,
                                  right: CustomSize.sizeXV,
                                ),
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding:
                                          EdgeInsets.all(CustomSize.sizeXV),
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'About',
                                            style: TextStyle(
                                              color: CustomColor.colorDark,
                                              fontWeight: FontWeight.bold,
                                              fontSize: CustomSize.sizeXVII,
                                            ),
                                            textAlign: TextAlign.center,
                                          ),
                                        ],
                                      ),
                                    ),
                                    ElevatedButton.icon(
                                      onPressed: () => {
                                        copyToClipboard(
                                          context,
                                          snapshot.data!.id,
                                        )
                                      },
                                      style: TextButton.styleFrom(
                                        backgroundColor: CustomColor.colorLight,
                                        padding: EdgeInsets.symmetric(
                                          vertical: CustomSize.sizeX,
                                          horizontal: CustomSize.sizeXXX,
                                        ),
                                        shadowColor: const Color(0xffffffff),
                                        tapTargetSize:
                                            MaterialTapTargetSize.padded,
                                      ),
                                      icon: FaIcon(
                                        FontAwesomeIcons.copy,
                                        size: CustomSize.sizeXVII,
                                        color: CustomColor.colorSecondary,
                                      ),
                                      label: Text(
                                        'Item address: ${snapshot.data!.id}',
                                        style: TextStyle(
                                          color: CustomColor.colorSecondary,
                                          fontWeight: FontWeight.normal,
                                          fontSize: CustomSize.sizeXVII,
                                        ),
                                      ),
                                    ),
                                    ElevatedButton.icon(
                                      onPressed: () => {
                                        copyToClipboard(
                                          context,
                                          snapshot.data!.rawDataHash,
                                        )
                                      },
                                      style: TextButton.styleFrom(
                                        backgroundColor: CustomColor.colorLight,
                                        padding: EdgeInsets.symmetric(
                                          vertical: CustomSize.sizeX,
                                          horizontal: CustomSize.sizeXXX,
                                        ),
                                        shadowColor: const Color(0xffffffff),
                                        tapTargetSize:
                                            MaterialTapTargetSize.padded,
                                      ),
                                      icon: FaIcon(
                                        FontAwesomeIcons.copy,
                                        size: CustomSize.sizeXVII,
                                        color: CustomColor.colorSecondary,
                                      ),
                                      label: Text(
                                        'Raw data hash: ${snapshot.data!.rawDataHash}',
                                        style: TextStyle(
                                          color: CustomColor.colorSecondary,
                                          fontWeight: FontWeight.normal,
                                          fontSize: CustomSize.sizeXVII,
                                        ),
                                      ),
                                    ),

                                    ElevatedButton.icon(
                                      onPressed: () => {
                                        copyToClipboard(
                                          context,
                                          snapshot.data!.createdAt,
                                        )
                                      },
                                      style: TextButton.styleFrom(
                                        backgroundColor: CustomColor.colorLight,
                                        padding: EdgeInsets.symmetric(
                                          vertical: CustomSize.sizeX,
                                          horizontal: CustomSize.sizeXXX,
                                        ),
                                        shadowColor: const Color(0xffffffff),
                                        tapTargetSize:
                                            MaterialTapTargetSize.padded,
                                      ),
                                      icon: FaIcon(
                                        FontAwesomeIcons.copy,
                                        size: CustomSize.sizeXVII,
                                        color: CustomColor.colorSecondary,
                                      ),
                                      label: Text(
                                        'Create at: ${snapshot.data!.createdAt}',
                                        style: TextStyle(
                                          color: CustomColor.colorSecondary,
                                          fontWeight: FontWeight.normal,
                                          fontSize: CustomSize.sizeXVII,
                                        ),
                                      ),
                                    ),

                                    ElevatedButton.icon(
                                      onPressed: () => {
                                        copyToClipboard(
                                          context,
                                          snapshot.data!.externalLink,
                                        )
                                      },
                                      style: TextButton.styleFrom(
                                        backgroundColor: CustomColor.colorLight,
                                        padding: EdgeInsets.symmetric(
                                          vertical: CustomSize.sizeX,
                                          horizontal: CustomSize.sizeXXX,
                                        ),
                                        shadowColor: const Color(0xffffffff),
                                        tapTargetSize:
                                            MaterialTapTargetSize.padded,
                                      ),
                                      icon: FaIcon(
                                        FontAwesomeIcons.copy,
                                        size: CustomSize.sizeXVII,
                                        color: CustomColor.colorSecondary,
                                      ),
                                      label: Text(
                                        'External link: ${snapshot.data!.externalLink}',
                                        style: TextStyle(
                                          color: CustomColor.colorSecondary,
                                          fontWeight: FontWeight.normal,
                                          fontSize: CustomSize.sizeXVII,
                                        ),
                                      ),
                                    ),
                                    // Text(
                                    //   'Owner by: ${subAddress(snapshot.data!.owner, 3)}',
                                    //   style: TextStyle(
                                    //     color: CustomColor.colorSecondary,
                                    //     // fontWeight: FontWeight.bold,
                                    //     fontSize: CustomSize.sizeXVII,
                                    //   ),
                                    // ),

                                    SizedBox(
                                      height: CustomSize.sizeXX,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  } else {
                    return loadingCircular();
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
