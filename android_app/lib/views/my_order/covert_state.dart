import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../utils/constants/theme.dart';

RichText covertState(orderState) {
  return RichText(
    textAlign: TextAlign.right,
    text: TextSpan(
      children: [
        WidgetSpan(
          child: FaIcon(
            FontAwesomeIcons.ship,
            color: CustomColor.colorPrimary,
            size: CustomSize.sizeXVII,
          ),
        ),
        TextSpan(
          text: ' ${stateToText(orderState)}',
          style: TextStyle(
            fontSize: CustomSize.sizeXVII,
            color: CustomColor.colorDark,
          ),
        ),
      ],
    ),
  );
}

String stateToText(state) {
  if (state == 0) {
    return 'Placed';
  } else if (state == 1) {
    return 'Comfirmed';
  } else if (state == 2) {
    return 'Shipping';
  } else if (state == 3) {
    return 'Delivered';
  } else {
    return 'Canceled';
  }
}
