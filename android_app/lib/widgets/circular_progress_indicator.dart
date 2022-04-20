import 'package:flutter/material.dart';

import '../utils/constants/theme.dart';

Center loadingCircular() {
  return Center(
    child: SingleChildScrollView(
      padding: EdgeInsets.only(
        left: CustomSize.sizeXXV,
        right: CustomSize.sizeXXV,
        top: CustomSize.sizeCC,
      ),
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
  );
}

Center loadingCircularSmall() {
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
              top: CustomSize.sizeX,
              bottom: CustomSize.sizeXV,
            ),
            child: CircularProgressIndicator(
              color: CustomColor.colorSecondary,
            ),
          ),
          Text(
            'Loading',
            style: TextStyle(
              fontSize: CustomSize.sizeX,
              color: CustomColor.colorSecondary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    ),
  );
}
