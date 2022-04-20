import 'package:flutter/material.dart';

class CustomTheme {
  static ThemeData get lightTheme => ThemeData(
      primaryColor: CustomColor.colorPrimary,
      scaffoldBackgroundColor: CustomColor.colorLight,
      buttonTheme: ButtonThemeData(
        buttonColor: CustomColor.colorDark,
      ));

  static ThemeData get darkTheme => ThemeData(
        primaryColor: CustomColor.colorPrimary,
        scaffoldBackgroundColor: CustomColor.colorDark,
      );
}

class CustomSize {
  static double sizeV = 5.0;

  static double sizeX = 10.0;

  static double sizeXV = 15.0;

  static double sizeXX = 20.0;

  static double sizeXVII = 17.0;

  static double sizeXXV = 25.0;

  static double sizeXXX = 30.0;

  static double sizeL = 50.0;

  static double sizeC = 100.0;

  static double sizeCL = 150.0;

  static double sizeCC = 200.0;

  static double sizeCCL = 250.0;

  static double sizeCD = 400.0;

  static double sizeD = 500.0;
}

class CustomColor {
  static Color colorPrimary = const Color(0xFF0d6efd);

  static Color colorInfo = const Color(0xFF0dcaf0);

  static Color colorSuccess = const Color(0xff198754);

  static Color colorWarning = const Color(0xffffc107);

  static Color colorOrange = const Color(0xfffd7e14);

  static Color colorDanger = const Color(0xffdc3545);

  static Color colorLight = const Color(0xfff8f9fa);

  static Color colorGay = const Color(0xffefeff5);

  static Color colorSecondary = const Color(0xff6c757d);

  static Color colorDark = const Color(0xFF212529);
}
