import 'package:flutter/material.dart';

import '../utils/constants/theme.dart';

Container loadingCircular() {
  return Container(
    decoration: BoxDecoration(color: CustomColor.colorLight),
    child: Center(
      child: SingleChildScrollView(
        padding: EdgeInsets.all(CustomSize.sizeXXV),
        child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: EdgeInsets.only(
                top: CustomSize.sizeXXV,
                bottom: CustomSize.sizeXXX,
              ),
              child: CircularProgressIndicator(
                color: CustomColor.colorSecondary,
              ),
            ),
            Text(
              'Loading',
              style: TextStyle(
                fontSize: CustomSize.sizeXX,
                color: CustomColor.colorSecondary,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    ),
  );
}
