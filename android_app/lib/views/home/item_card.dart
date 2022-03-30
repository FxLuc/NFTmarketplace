import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../utils/ethereum.dart';

Card itemCard(context, index, snapshot) {
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
            padding: EdgeInsets.all(CustomSize.sizeX),
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
              left: CustomSize.sizeX,
              right: CustomSize.sizeX,
              bottom: CustomSize.sizeX,
            ),
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
                          text: subAddress(snapshot.data![index].id, 3),
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
                    )),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}
