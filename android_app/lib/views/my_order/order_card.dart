import 'package:android_app/utils/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../utils/ethereum.dart';
import '../item/item_view.dart';
import 'covert_state.dart';

Card orderCard(context, index, snapshot) {
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
                address: snapshot.data![index].itemContract.id,
              ),
            ),
          ),
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(CustomSize.sizeX),
                bottomLeft: Radius.circular(CustomSize.sizeX),
              ),
              child: Image.network(
                '${snapshot.data![index].itemContract.picture}',
                fit: BoxFit.fitWidth,
                height: CustomSize.sizeC,
                width: CustomSize.sizeC,
              ),
            ),
            Flexible(
              child: Padding(
                padding: EdgeInsets.only(
                  top: CustomSize.sizeXV,
                  bottom: CustomSize.sizeXV,
                  left: CustomSize.sizeXV,
                  right: CustomSize.sizeXX,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${snapshot.data![index].itemContract.name}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      textAlign: TextAlign.left,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(
                      height: CustomSize.sizeXV,
                    ),
                    Text(
                      '${snapshot.data![index].seller}',
                      maxLines: 1,
                      textAlign: TextAlign.left,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: CustomColor.colorSecondary),
                    ),
                    SizedBox(
                      height: CustomSize.sizeXV,
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        RichText(
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
                        covertState(snapshot.data![index].state),
                      ],
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
