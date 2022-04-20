import 'package:flutter/material.dart';

SnackBar snackBarControl(String content, String label) {
  return SnackBar(
    behavior: SnackBarBehavior.floating,
    duration: const Duration(seconds: 5),
    content: Text(content),
    action: SnackBarAction(
      label: label,
      onPressed: () {},
    ),
  );
}