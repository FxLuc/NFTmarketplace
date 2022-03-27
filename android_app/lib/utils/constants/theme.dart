import 'package:flutter/material.dart';

class CustomTheme {
  static ThemeData get lightTheme {
    return ThemeData(
        primaryColor: CustomColor.colorPrimary,
        scaffoldBackgroundColor: CustomColor.colorLight,
        buttonTheme: ButtonThemeData(
          buttonColor: CustomColor.colorDark,
        ));
  }

  static ThemeData get darkTheme {
    return ThemeData(
      primaryColor: CustomColor.colorPrimary,
      scaffoldBackgroundColor: CustomColor.colorDark,
    );
  }
}

class CustomSize {
  static double get sizeV {
    return 5.0;
  }

  static double get sizeX {
    return 10.0;
  }

  static double get sizeXV {
    return 15.0;
  }

  static double get sizeXX {
    return 20.0;
  }

  static double get sizeXVII {
    return 17.0;
  }

  static double get sizeXXV {
    return 25.0;
  }

  static double get sizeXXX {
    return 30.0;
  }

  static double get sizeL {
    return 50.0;
  }

  static double get sizeC {
    return 100.0;
  }

  static double get sizeCL {
    return 150.0;
  }

  static double get sizeCC {
    return 200.0;
  }
}

class CustomColor {
  static Color get colorPrimary {
    return const Color(0xFF0d6efd);
  }

  static Color get colorInfo {
    return const Color(0xFF0dcaf0);
  }

  static Color get colorSuccess {
    return const Color(0xff198754);
  }

  static Color get colorWarning {
    return const Color(0xffffc107);
  }

  static Color get colorOrange {
    return const Color(0xfffd7e14);
  }

  static Color get colorDanger {
    return const Color(0xffdc3545);
  }

  static Color get colorLight {
    return const Color(0xfff8f9fa);
  }

  static Color get colorSecondary {
    return const Color(0xff6c757d);
  }

  static Color get colorDark {
    return const Color(0xFF212529);
  }
}
