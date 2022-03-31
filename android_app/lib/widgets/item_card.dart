import 'package:android_app/utils/clipboard.dart';
import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../utils/ethereum.dart';
import '../views/item/item_view.dart';

Card itemCard(context, index, snapshot) {
  return Card(
    shape: RoundedRectangleBorder(
      side: BorderSide(color: CustomColor.colorGay, width: 1),
      borderRadius: BorderRadius.circular(CustomSize.sizeX),
    ),
    margin: EdgeInsets.only(bottom: CustomSize.sizeXV),
    child: Container(
      // color: Colors.white,
      child: InkWell(
        onTap: () => {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ItemView(
                address: snapshot.data![index].id,
              ),
            ),
          ),
        },
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(CustomSize.sizeX),
                topRight: Radius.circular(CustomSize.sizeX),
              ),
              child: Image.network(
                '${snapshot.data![index].picture}',
                fit: BoxFit.fitWidth,
                height: CustomSize.sizeCCL,
                width: CustomSize.sizeCD,
              ),
            ),
            Padding(
              padding: EdgeInsets.all(CustomSize.sizeXV),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${snapshot.data![index].name}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: CustomColor.colorDark,
                      fontSize: CustomSize.sizeXX,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(
                    height: CustomSize.sizeV,
                  ),
                  Text(
                    'Owner: ${subAddress(snapshot.data![index].owner, 3)}',
                    style: TextStyle(
                      color: CustomColor.colorSecondary,
                      fontWeight: FontWeight.bold,
                      fontSize: CustomSize.sizeXVII,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                left: CustomSize.sizeXV,
                right: CustomSize.sizeXV,
                bottom: CustomSize.sizeXV,
              ),
              child: Row(
                children: <Widget>[
                  Expanded(
                    flex: 1,
                    child: InkWell(
                      onTap: () =>
                          copyToClipboard(context, snapshot.data![index].id),
                      child: RichText(
                        text: TextSpan(
                          children: [
                            WidgetSpan(
                              child: FaIcon(
                                FontAwesomeIcons.copy,
                                color: CustomColor.colorDark,
                                size: CustomSize.sizeXV,
                              ),
                            ),
                            TextSpan(
                              text: '  ' +
                                  subAddress(snapshot.data![index].id, 3),
                              style: TextStyle(
                                color: CustomColor.colorDark,
                                fontSize: CustomSize.sizeXV,
                              ),
                            ),
                          ],
                        ),
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
                            child: FaIcon(
                              FontAwesomeIcons.ethereum,
                              color: CustomColor.colorPrimary,
                              size: CustomSize.sizeXVII,
                            ),
                          ),
                          TextSpan(
                            text:
                                ' ${covertToEther(BigInt.from(snapshot.data![index].price))} ETH',
                            style: TextStyle(
                              fontSize: CustomSize.sizeXVII,
                              color: CustomColor.colorDark,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
